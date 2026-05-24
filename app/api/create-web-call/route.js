import { NextResponse } from "next/server";

const RETELL_CREATE_WEB_CALL_URL = "https://api.retellai.com/v2/create-web-call";
const DEFAULT_AGENT_ID = "agent_01589e1e2e90c7e4e79454cd90";
const DEFAULT_AGENT_VERSION = 1;

export async function POST(request) {
  const apiKey = process.env.RETELL_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "RETELL_API_KEY is not configured." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const agentVersion = Number(
    process.env.RETELL_AGENT_VERSION ?? body.agent_version ?? DEFAULT_AGENT_VERSION,
  );

  const payload = {
    agent_id: process.env.RETELL_AGENT_ID ?? DEFAULT_AGENT_ID,
    agent_version: Number.isFinite(agentVersion) ? agentVersion : DEFAULT_AGENT_VERSION,
    metadata: {
      source: "academy_mma_website",
      page: "voice_ai_demo",
      ...body.metadata,
    },
    retell_llm_dynamic_variables: {
      business_name: "The Academy MMA",
      location: "33 Davisville Ave, Toronto",
      demo_source: "website_cta",
      ...body.retell_llm_dynamic_variables,
    },
  };

  const response = await fetch(RETELL_CREATE_WEB_CALL_URL, {
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
        error: "Unable to create Retell web call.",
        details: data,
      },
      { status: response.status },
    );
  }

  return NextResponse.json({
    access_token: data.access_token,
    call_id: data.call_id,
    agent_id: data.agent_id,
    agent_name: data.agent_name,
    call_status: data.call_status,
  });
}
