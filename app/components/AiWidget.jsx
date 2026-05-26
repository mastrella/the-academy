"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";

const introMessages = [
  {
    role: "agent",
    content:
      "Hi, I can help with trial classes, schedules, programs, private instruction, and getting started at The Academy.",
  },
];

const quickPrompts = [
  "Which class should I try first?",
  "How does the free trial work?",
  "Where is the gym entrance?",
];

const statusCopy = {
  idle: "Ready",
  connecting: "Connecting",
  live: "Live",
  ended: "Ended",
  error: "Needs setup",
};

export default function AiWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("chat");
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState(introMessages);
  const [input, setInput] = useState("");
  const [chatStatus, setChatStatus] = useState("idle");
  const [chatError, setChatError] = useState("");
  const [voiceStatus, setVoiceStatus] = useState("idle");
  const [activeSpeaker, setActiveSpeaker] = useState("Browser microphone");
  const [voiceError, setVoiceError] = useState("");
  const [callId, setCallId] = useState("");
  const transcriptRef = useRef(null);

  const retellClient = useMemo(() => new RetellWebClient(), []);
  const isCalling = voiceStatus === "connecting" || voiceStatus === "live";

  useEffect(() => {
    const handleStarted = () => {
      setVoiceStatus("live");
      setVoiceError("");
    };
    const handleEnded = () => {
      setVoiceStatus("ended");
      setActiveSpeaker("Browser microphone");
    };
    const handleAgentStart = () => setActiveSpeaker("AI speaking");
    const handleAgentStop = () => setActiveSpeaker("Listening");
    const handleError = (event) => {
      setVoiceStatus("error");
      setActiveSpeaker("Browser microphone");
      setVoiceError(event?.message ?? "The call could not continue. Please try again.");
      retellClient.stopCall();
    };

    retellClient.on("call_started", handleStarted);
    retellClient.on("call_ended", handleEnded);
    retellClient.on("agent_start_talking", handleAgentStart);
    retellClient.on("agent_stop_talking", handleAgentStop);
    retellClient.on("error", handleError);

    return () => {
      retellClient.stopCall();
      retellClient.removeAllListeners?.();
    };
  }, [retellClient]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  async function sendMessage(event) {
    event.preventDefault();
    await submitChatMessage(input);
  }

  async function submitChatMessage(value) {
    const content = value.trim();

    if (!content || chatStatus === "loading") {
      return;
    }

    setInput("");
    setChatError("");
    setChatStatus("loading");
    setMessages((current) => [...current, { role: "user", content }]);

    try {
      let activeChatId = chatId;

      if (!activeChatId) {
        const createResponse = await fetch("/api/create-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            metadata: { source: "site_ai_widget" },
          }),
        });
        const createData = await createResponse.json();

        if (!createResponse.ok) {
          throw new Error(createData.error ?? "Chat is not configured yet.");
        }

        activeChatId = createData.chat_id;
        setChatId(activeChatId);
      }

      const response = await fetch("/api/create-chat-completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: activeChatId, content }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to get a reply.");
      }

      const nextMessages = Array.isArray(data.messages)
        ? data.messages
            .filter((message) => message?.content)
            .map((message) => ({
              role: message.role === "user" ? "user" : "agent",
              content: message.content,
            }))
        : [];

      setMessages((current) => [...current, ...nextMessages]);
      setChatStatus("idle");
    } catch (error) {
      setChatError(error.message);
      setChatStatus("error");
    }
  }

  async function startCall() {
    setOpen(true);
    setMode("voice");
    setVoiceStatus("connecting");
    setActiveSpeaker("Starting");
    setVoiceError("");

    try {
      const response = await fetch("/api/create-web-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metadata: { started_from: "site_ai_widget" },
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        const setupMessage = data?.setup?.missing?.length
          ? `Missing ${data.setup.missing.join(", ")} in ${data.setup.file}.`
          : "";
        throw new Error(setupMessage || data?.details?.message || data?.error || "Unable to start voice.");
      }

      setCallId(data.call_id);
      await retellClient.startCall({
        accessToken: data.access_token,
        sampleRate: 24000,
      });
    } catch (error) {
      setVoiceStatus("error");
      setActiveSpeaker("Browser microphone");
      setVoiceError(error.message);
    }
  }

  function stopCall() {
    retellClient.stopCall();
    setVoiceStatus("ended");
    setActiveSpeaker("Browser microphone");
  }

  return (
    <aside className={`ai-widget ${open ? "ai-widget-open" : ""}`} aria-label="AI assistant">
      {open ? (
        <section className="ai-panel">
          <div className="ai-panel-header">
            <div>
              <p className="eyebrow">Academy AI</p>
              <h2>Ask about training</h2>
            </div>
            <button className="icon-button" type="button" onClick={() => setOpen(false)} aria-label="Close AI assistant">
              x
            </button>
          </div>

          <div className="ai-tabs" role="tablist" aria-label="Assistant mode">
            <button
              className={mode === "chat" ? "active" : ""}
              type="button"
              onClick={() => setMode("chat")}
            >
              Chat
            </button>
            <button
              className={mode === "voice" ? "active" : ""}
              type="button"
              onClick={() => setMode("voice")}
            >
              Voice
            </button>
          </div>

          {mode === "chat" ? (
            <div className="ai-chat-pane">
              <div className="quick-prompts" aria-label="Suggested questions">
                {quickPrompts.map((prompt) => (
                  <button type="button" onClick={() => submitChatMessage(prompt)} key={prompt}>
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="chat-transcript" ref={transcriptRef}>
                {messages.map((message, index) => (
                  <p className={`chat-bubble ${message.role}`} key={`${message.role}-${index}`}>
                    {message.content}
                  </p>
                ))}
                {chatStatus === "loading" ? <p className="chat-bubble agent">Typing...</p> : null}
              </div>
              {chatError ? <p className="widget-error">{chatError}</p> : null}
              <form className="chat-input-row" onSubmit={sendMessage}>
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about trial classes..."
                  aria-label="Message The Academy AI"
                />
                <button type="submit" disabled={chatStatus === "loading"}>
                  Send
                </button>
              </form>
            </div>
          ) : (
            <div className="ai-voice-pane">
              <div className={`voice-visual ${isCalling ? "voice-visual-active" : ""}`} aria-hidden="true">
                <span />
              </div>
              <div className="voice-state">
                <strong>{statusCopy[voiceStatus] ?? statusCopy.idle}</strong>
                <span>{callId ? `Call ${callId.slice(0, 8)}` : activeSpeaker}</span>
              </div>
              {voiceError ? <p className="widget-error">{voiceError}</p> : null}
              {!isCalling ? (
                <button className="button button-primary widget-action" type="button" onClick={startCall}>
                  Start Voice Call
                </button>
              ) : (
                <button className="button button-secondary widget-action" type="button" onClick={stopCall}>
                  End Call
                </button>
              )}
            </div>
          )}
        </section>
      ) : (
        <button className="ai-launcher" type="button" onClick={() => setOpen(true)} aria-label="Open AI assistant">
          <span>AI</span>
          <strong>Ask us</strong>
        </button>
      )}
    </aside>
  );
}
