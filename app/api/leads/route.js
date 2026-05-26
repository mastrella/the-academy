import { NextResponse } from "next/server";

const requiredFields = ["name", "phone", "email", "program", "audience", "experience", "preferredTime"];

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const missingFields = requiredFields.filter((field) => !String(body[field] ?? "").trim());
  const startedAt = Number(body.formStartedAt);

  if (String(body.website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  if (Number.isFinite(startedAt) && Date.now() - startedAt < 1200) {
    return NextResponse.json(
      { error: "Please review the form and try again." },
      { status: 400 },
    );
  }

  if (missingFields.length) {
    return NextResponse.json(
      { error: `Missing required field: ${missingFields.join(", ")}` },
      { status: 400 },
    );
  }

  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    source: body.source ?? "website",
    name: String(body.name).trim(),
    phone: String(body.phone).trim(),
    email: String(body.email).trim(),
    program: String(body.program).trim(),
    audience: String(body.audience).trim(),
    experience: String(body.experience).trim(),
    preferredTime: String(body.preferredTime).trim(),
    goals: String(body.goals ?? "").trim(),
    preferredContact: String(body.preferredContact ?? "phone").trim(),
    emailConsent: Boolean(body.emailConsent),
    smsConsent: Boolean(body.smsConsent),
    utm: typeof body.utm === "object" && body.utm ? body.utm : {},
  };

  console.info("New Academy lead captured", lead);

  return NextResponse.json({
    ok: true,
    leadId: lead.id,
    nextStep:
      "Lead captured. Wire this route to Supabase/Airtable, Resend, Twilio, and admin notifications.",
  });
}
