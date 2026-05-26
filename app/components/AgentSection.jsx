import LeadForm from "./LeadForm";
import VoiceDemo from "./VoiceDemo";

export default function AgentSection() {
  return (
    <section className="agent-section" id="voice-agent">
      <div className="agent-copy">
        <p className="eyebrow">New Website Layer</p>
        <h2>Voice and chat capture for every serious inquiry.</h2>
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
