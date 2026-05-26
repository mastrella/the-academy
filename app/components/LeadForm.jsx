"use client";

import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  program: "",
  audience: "",
  experience: "",
  preferredTime: "",
  goals: "",
  preferredContact: "phone",
  emailConsent: true,
  smsConsent: false,
  utm: {},
  website: "",
  formStartedAt: "",
};

export default function LeadForm({ source = "website", title = "Start Here" }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = {};

    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
      const value = params.get(key);
      if (value) {
        utm[key] = value;
      }
    });

    setForm((current) => ({
      ...current,
      formStartedAt: String(Date.now()),
      ...(Object.keys(utm).length ? { utm } : {}),
    }));
  }, []);

  function updateField(event) {
    const { name, type, checked, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function submitLead(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send this request.");
      }

      setStatus("success");
      setMessage("Thanks. The Academy team has the details for follow-up.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  return (
    <form className="lead-form" onSubmit={submitLead}>
      <div>
        <p className="eyebrow">Lead Capture</p>
        <h2>{title}</h2>
      </div>

      <label className="form-trap" aria-hidden="true">
        Website
        <input
          name="website"
          tabIndex="-1"
          autoComplete="off"
          value={form.website}
          onChange={updateField}
        />
      </label>

      <label>
        Name
        <input name="name" value={form.name} onChange={updateField} required />
      </label>

      <div className="form-grid">
        <label>
          Phone
          <input name="phone" type="tel" value={form.phone} onChange={updateField} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={updateField} required />
        </label>
      </div>

      <label>
        Program interest
        <select name="program" value={form.program} onChange={updateField} required>
          <option value="">Select one</option>
          <option>Brazilian Jiu Jitsu</option>
          <option>No Gi Jiu Jitsu</option>
          <option>Kickboxing</option>
          <option>Judo</option>
          <option>Wrestling</option>
          <option>Kids / Youth Classes</option>
          <option>Private Instruction</option>
          <option>Not sure yet</option>
        </select>
      </label>

      <div className="form-grid">
        <label>
          Student type
          <select name="audience" value={form.audience} onChange={updateField} required>
            <option value="">Select one</option>
            <option>Adult</option>
            <option>Teen / Youth</option>
            <option>Kid</option>
            <option>Parent asking for child</option>
          </select>
        </label>

        <label>
          Experience
          <select name="experience" value={form.experience} onChange={updateField} required>
            <option value="">Select one</option>
            <option>Complete beginner</option>
            <option>Some experience</option>
            <option>Currently training</option>
            <option>Returning after time off</option>
          </select>
        </label>
      </div>

      <label>
        Preferred class time
        <select name="preferredTime" value={form.preferredTime} onChange={updateField} required>
          <option value="">Select one</option>
          <option>Early morning</option>
          <option>Lunch</option>
          <option>Afternoon</option>
          <option>Evening</option>
          <option>Weekend</option>
          <option>Flexible</option>
        </select>
      </label>

      <label>
        Goals or question
        <textarea
          name="goals"
          rows="4"
          value={form.goals}
          onChange={updateField}
          placeholder="Tell us what you want help with."
        />
      </label>

      <label>
        Preferred contact
        <select name="preferredContact" value={form.preferredContact} onChange={updateField}>
          <option value="phone">Phone</option>
          <option value="text">Text</option>
          <option value="email">Email</option>
        </select>
      </label>

      <label className="checkbox-label">
        <input
          name="emailConsent"
          type="checkbox"
          checked={form.emailConsent}
          onChange={updateField}
        />
        I agree to receive email follow-up about my inquiry.
      </label>

      <label className="checkbox-label">
        <input
          name="smsConsent"
          type="checkbox"
          checked={form.smsConsent}
          onChange={updateField}
        />
        I agree to receive text messages about my inquiry.
      </label>

      <button className="button button-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Request"}
      </button>

      {message ? <p className={`form-message form-${status}`}>{message}</p> : null}
    </form>
  );
}
