import VoiceDemo from "./components/VoiceDemo";

const useCases = [
  {
    title: "New Student Intake",
    body: "Answers first-time callers, learns their goals, experience level, preferred program, and best contact details.",
  },
  {
    title: "Schedule Questions",
    body: "Handles common questions about BJJ, No Gi, MMA, Kickboxing, Wrestling, Judo, kids classes, and open training.",
  },
  {
    title: "Trial Class Routing",
    body: "Guides prospects toward the right next step and gives staff a clean summary to follow up fast.",
  },
  {
    title: "After-Hours Coverage",
    body: "Keeps the front desk reachable while coaches are teaching, training, closing, or away from the phone.",
  },
];

const flow = ["Answer", "Understand", "Qualify", "Guide", "Capture"];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <div>
            <p className="brand-kicker">The Academy MMA</p>
            <h1>Voice AI Receptionist</h1>
          </div>
          <a className="nav-link" href="#try">
            Try the Voice AI
          </a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="tagline">Built for The Academy&apos;s real front-desk calls</p>
            <h2>Let every caller get a clear answer, even when the team is on the mats.</h2>
            <p>
              A browser-based voice demo that shows how an AI receptionist can answer calls,
              explain programs, qualify new students, collect contact details, and route the
              right follow-up to staff.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#try">
                Try the Voice AI
              </a>
              <a className="secondary-link" href="#use-cases">
                View Use Cases
              </a>
            </div>
          </div>

          <VoiceDemo />
        </div>
      </section>

      <section className="section" id="use-cases">
        <div className="section-heading">
          <p className="eyebrow">Voice Use Cases</p>
          <h2>Designed around high-intent phone calls.</h2>
        </div>
        <div className="use-case-grid">
          {useCases.map((item) => (
            <article className="use-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="light-section">
        <div className="split">
          <div>
            <p className="eyebrow red">The Opportunity</p>
            <h2>The phone rings when the team is busiest.</h2>
            <p>
              The Academy runs a full weekly schedule across striking, grappling, kids
              programs, and open training. Many calls are simple but valuable: class times,
              beginner fit, trial-class requests, membership questions, and location details.
            </p>
          </div>
          <div className="check-grid">
            <div>Fewer missed trial-class leads</div>
            <div>Cleaner summaries for staff</div>
            <div>Faster answers for first-time callers</div>
            <div>Coverage after hours and during classes</div>
            <div>Consistent intake questions</div>
            <div>Clear escalation for staff-only issues</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Call Flow</p>
          <h2>Simple, focused, and easy to evaluate.</h2>
        </div>
        <div className="flow-grid">
          {flow.map((step, index) => (
            <article className="flow-card" key={step}>
              <span>{index + 1}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <footer>
        Prepared for The Academy MMA - 33 Davisville Ave, Toronto - Voice AI Receptionist
      </footer>
    </main>
  );
}
