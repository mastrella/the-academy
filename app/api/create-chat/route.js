import { NextResponse } from "next/server";

const RETELL_CREATE_CHAT_URL = "https://api.retellai.com/create-chat";

export async function POST(request) {
  const apiKey = process.env.RETELL_API_KEY?.trim();
  const agentId = process.env.RETELL_CHAT_AGENT_ID?.trim();

  if (!apiKey || !agentId) {
    return NextResponse.json(
      {
        error: "Chat agent is not configured.",
        setup: {
          missing: [
            ...(!apiKey ? ["RETELL_API_KEY"] : []),
            ...(!agentId ? ["RETELL_CHAT_AGENT_ID"] : []),
          ],
          file: ".env.local",
          restartRequired: true,
        },
      },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const versionValue = process.env.RETELL_CHAT_AGENT_VERSION?.trim() || body.agent_version;
  const agentVersion = Number(versionValue);

  const payload = {
    agent_id: agentId,
    metadata: {
      source: "academy_site_ai_widget",
      ...body.metadata,
    },
    retell_llm_dynamic_variables: {
      business_name: "The Academy Toronto",
      location: "33 Davisville Ave, Toronto",
      ...body.retell_llm_dynamic_variables,
    },
  };

  if (versionValue && Number.isFinite(agentVersion)) {
    payload.agent_version = agentVersion;
  }

  const response = await fetch(RETELL_CREATE_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(
      {
        error: data?.message || "Unable to create Retell chat.",
        details: data,
      },
      { status: response.status },
    );
  }

  return NextResponse.json({
    chat_id: data.chat_id,
    agent_id: data.agent_id,
    chat_status: data.chat_status,
  });
}
