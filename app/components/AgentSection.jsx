import LeadForm from "./LeadForm";
import VoiceDemo from "./VoiceDemo";

export default function AgentSection() {
  return (
    <section className="agent-section" id="voice-agent">
      <div className="agent-copy">
        <p className="eyebrow">Questions before class?</p>
        <h2>Get answers before you walk in.</h2>
        <p>
          This upgrade adds an AI front desk that can answer common questions, collect name,
          phone, email, goals, program interest, and preferred class time, then notify the gym
          administrator.
        </p>
      </div>
      <div className="agent-grid">
        <VoiceDemo />
        <LeadForm source="agent_section" title="Prefer a Form?" />
      </div>
    </section>
  );
}
