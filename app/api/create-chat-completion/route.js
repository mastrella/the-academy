import { NextResponse } from "next/server";

const RETELL_CREATE_CHAT_COMPLETION_URL = "https://api.retellai.com/create-chat-completion";

export async function POST(request) {
  const apiKey = process.env.RETELL_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Chat agent is not configured.",
        setup: {
          missing: ["RETELL_API_KEY"],
          file: ".env.local",
          restartRequired: true,
        },
      },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const chatId = String(body.chat_id ?? "").trim();
  const content = String(body.content ?? "").trim();

  if (!chatId || !content) {
    return NextResponse.json(
      { error: "Missing required field: chat_id, content" },
      { status: 400 },
    );
  }

  const response = await fetch(RETELL_CREATE_CHAT_COMPLETION_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chat_id: chatId, content }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(
      {
        error: data?.message || "Unable to create Retell chat completion.",
        details: data,
      },
      { status: response.status },
    );
  }

  return NextResponse.json({
    messages: Array.isArray(data.messages) ? data.messages : [],
  });
}
