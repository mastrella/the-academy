import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

function toDisplayValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => toDisplayValue(item))
      .filter(Boolean)
      .join("\n");
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}

function firstValue(...values) {
  for (const value of values) {
    const displayValue = toDisplayValue(value);

    if (displayValue) {
      return displayValue;
    }
  }

  return "";
}

function extractMessages(chat) {
  const messages = chat?.messages ?? chat?.transcript_object ?? chat?.transcript;

  if (!Array.isArray(messages)) {
    return messages;
  }

  return messages
    .map((message) => {
      const role = firstValue(message?.role, message?.speaker, message?.sender);
      const content = firstValue(message?.content, message?.text, message?.message);

      return [role, content].filter(Boolean).join(": ");
    })
    .filter(Boolean);
}

function extractLead(payload) {
  const chat = payload?.chat ?? {};
  const chatAnalysis = chat?.chat_analysis ?? payload?.chat_analysis ?? {};
  const customAnalysisData = chatAnalysis?.custom_analysis_data ?? {};

  return {
    customer_name: firstValue(
      customAnalysisData.customer_name,
      payload.customer_name,
      chat.customer_name,
      chat.user_name,
    ),
    customer_phone: firstValue(
      customAnalysisData.customer_phone,
      payload.customer_phone,
      chat.customer_phone,
      chat.user_phone,
    ),
    customer_email: firstValue(
      customAnalysisData.customer_email,
      payload.customer_email,
      chat.customer_email,
      chat.user_email,
    ),
    training_interest: firstValue(
      customAnalysisData.training_interest,
      payload.training_interest,
    ),
    experience_level: firstValue(
      customAnalysisData.experience_level,
      payload.experience_level,
    ),
    preferred_class_time: firstValue(
      customAnalysisData.preferred_class_time,
      payload.preferred_class_time,
    ),
    lead_quality: firstValue(customAnalysisData.lead_quality, payload.lead_quality),
    chat_summary: firstValue(
      customAnalysisData.chat_summary,
      customAnalysisData.call_summary,
      payload.chat_summary,
      payload.call_summary,
      chatAnalysis.chat_summary,
      chatAnalysis.call_summary,
      chat.chat_summary,
    ),
    transcript: firstValue(
      customAnalysisData.transcript,
      payload.transcript,
      chat.transcript,
      extractMessages(chat),
    ),
    chat_id: firstValue(payload.chat_id, chat.chat_id, chat.id),
  };
}

function createEmailBody(lead) {
  return `New Academy MMA Chat Lead

Source: Web chat
Chat ID: ${lead.chat_id}

Name: ${lead.customer_name}
Phone: ${lead.customer_phone}
Email: ${lead.customer_email}
Interested In: ${lead.training_interest}
Experience Level: ${lead.experience_level}
Preferred Class Time: ${lead.preferred_class_time}
Lead Quality: ${lead.lead_quality}

Summary:
${lead.chat_summary}

Transcript:
${lead.transcript}
`;
}

function getMissingEnvVars() {
  return ["GMAIL_USER", "GMAIL_APP_PASSWORD", "LEAD_EMAIL_TO"].filter(
    (name) => !process.env[name]?.trim(),
  );
}

export async function POST(request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const event = payload.event;
  const chatId = firstValue(payload.chat_id, payload.chat?.chat_id, payload.chat?.id);

  console.log("Retell chat webhook incoming event:", event || "not provided");
  console.log("Retell chat webhook chat_id:", chatId || "not provided");

  if (event && event !== "chat_analyzed") {
    return NextResponse.json({ success: true, ignored: true, event });
  }

  const missingEnvVars = getMissingEnvVars();

  if (missingEnvVars.length) {
    return NextResponse.json(
      {
        error: "Email is not configured.",
        missingEnvVars,
      },
      { status: 500 },
    );
  }

  const lead = extractLead(payload);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.LEAD_EMAIL_TO,
      subject: `New Academy MMA Chat Lead - ${lead.customer_name || "Unknown"}`,
      text: createEmailBody(lead),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Retell chat webhook email failure:", error);

    return NextResponse.json(
      {
        error: "Email failed to send.",
        details: error instanceof Error ? error.message : "Unknown email error.",
      },
      { status: 500 },
    );
  }
}

function methodNotAllowed() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
