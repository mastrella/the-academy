"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";

const statusCopy = {
  idle: "Ready",
  connecting: "Connecting",
  live: "Live call",
  ended: "Call ended",
  error: "Needs attention",
};

export default function VoiceDemo() {
  const clientRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [activeSpeaker, setActiveSpeaker] = useState("Waiting");
  const [callId, setCallId] = useState("");
  const [error, setError] = useState("");
  const [transcript, setTranscript] = useState([]);

  const isCalling = status === "connecting" || status === "live";
  const statusLabel = statusCopy[status] ?? statusCopy.idle;

  const retellClient = useMemo(() => {
    const client = new RetellWebClient();
    clientRef.current = client;
    return client;
  }, []);

  useEffect(() => {
    const handleStarted = () => {
      setStatus("live");
      setError("");
    };

    const handleEnded = () => {
      setStatus("ended");
      setActiveSpeaker("Waiting");
    };

    const handleAgentStart = () => setActiveSpeaker("AI speaking");
    const handleAgentStop = () => setActiveSpeaker("Listening");

    const handleUpdate = (update) => {
      if (!update?.transcript) {
        return;
      }

      const lines = update.transcript
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(-5);

      setTranscript(lines);
    };

    const handleError = (event) => {
      setStatus("error");
      setActiveSpeaker("Waiting");
      setError(event?.message ?? "The call could not continue. Please try again.");
      retellClient.stopCall();
    };

    retellClient.on("call_started", handleStarted);
    retellClient.on("call_ended", handleEnded);
    retellClient.on("agent_start_talking", handleAgentStart);
    retellClient.on("agent_stop_talking", handleAgentStop);
    retellClient.on("update", handleUpdate);
    retellClient.on("error", handleError);

    return () => {
      retellClient.stopCall();
      retellClient.removeAllListeners?.();
    };
  }, [retellClient]);

  async function startCall() {
    setStatus("connecting");
    setActiveSpeaker("Starting");
    setError("");
    setTranscript([]);

    try {
      const response = await fetch("/api/create-web-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadata: {
            started_from: "try_voice_ai_cta",
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.details?.message ?? data?.error ?? "Unable to start demo.");
      }

      setCallId(data.call_id);
      await retellClient.startCall({
        accessToken: data.access_token,
        sampleRate: 24000,
      });
    } catch (startError) {
      setStatus("error");
      setActiveSpeaker("Waiting");
      setError(startError.message);
    }
  }

  function stopCall() {
    retellClient.stopCall();
    setStatus("ended");
    setActiveSpeaker("Waiting");
  }

  return (
    <section className="voice-card" id="try">
      <div className="voice-header">
        <div>
          <p className="eyebrow">Live Web Demo</p>
          <h2>Try the Voice AI</h2>
        </div>
        <div className={`status-pill status-${status}`}>{statusLabel}</div>
      </div>

      <div className="orb-wrap" aria-hidden="true">
        <div className={`voice-orb ${isCalling ? "voice-orb-active" : ""}`}>
          <span />
        </div>
      </div>

      <div className="call-meta">
        <span>{activeSpeaker}</span>
        <span>{callId ? `Call ${callId.slice(0, 8)}` : "Browser microphone"}</span>
      </div>

      <div className="demo-actions">
        {!isCalling ? (
          <button className="primary-action" type="button" onClick={startCall}>
            Try the Voice AI
          </button>
        ) : (
          <button className="danger-action" type="button" onClick={stopCall}>
            End Call
          </button>
        )}
      </div>

      {error ? <p className="error-message">{error}</p> : null}

      <div className="transcript-box">
        {transcript.length ? (
          transcript.map((line) => <p key={line}>{line}</p>)
        ) : (
          <p>Start a call to hear how the assistant handles trial classes, schedules, program fit, and lead capture.</p>
        )}
      </div>
    </section>
  );
}
