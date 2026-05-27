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

function extractLead(payload) {
  const call = payload?.call ?? {};
  const callAnalysis = call?.call_analysis ?? payload?.call_analysis ?? {};
  const customAnalysisData = callAnalysis?.custom_analysis_data ?? {};

  return {
    customer_name: firstValue(
      customAnalysisData.customer_name,
      payload.customer_name,
      call.customer_name,
      call.from_name,
    ),
    customer_phone: firstValue(
      customAnalysisData.customer_phone,
      payload.customer_phone,
      call.customer_phone,
      call.from_number,
      call.to_number,
    ),
    customer_email: firstValue(
      customAnalysisData.customer_email,
      payload.customer_email,
      call.customer_email,
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
    call_summary: firstValue(
      customAnalysisData.call_summary,
      payload.call_summary,
      callAnalysis.call_summary,
      call.call_summary,
    ),
    transcript: firstValue(
      customAnalysisData.transcript,
      payload.transcript,
      call.transcript,
      call.transcript_object,
    ),
    recording_url: firstValue(
      customAnalysisData.recording_url,
      payload.recording_url,
      call.recording_url,
    ),
  };
}

function createEmailBody(lead) {
  return `New Academy MMA Lead

Name: ${lead.customer_name}
Phone: ${lead.customer_phone}
Email: ${lead.customer_email}
Interested In: ${lead.training_interest}
Experience Level: ${lead.experience_level}
Preferred Class Time: ${lead.preferred_class_time}
Lead Quality: ${lead.lead_quality}

Summary:
${lead.call_summary}

Transcript:
${lead.transcript}

Recording URL:
${lead.recording_url}
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
  const callId = firstValue(payload.call_id, payload.call?.call_id, payload.call?.id);

  console.log("Retell webhook incoming event:", event || "not provided");
  console.log("Retell webhook call_id:", callId || "not provided");

  if (event && event !== "call_analyzed") {
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
      subject: `New Academy MMA Lead \u2014 ${lead.customer_name || "Unknown"}`,
      text: createEmailBody(lead),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Retell webhook email failure:", error);

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
