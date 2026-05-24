import VoiceDemo from "./components/VoiceDemo";

const useCases = [
  {
    title: "Capture new member inquiries",
    body: "When someone calls about getting started, the assistant collects their name, contact details, goals, experience level, and program interest.",
  },
  {
    title: "Answer schedule questions",
    body: "It can respond to common questions about BJJ, No Gi, MMA, Kickboxing, Wrestling, Judo, kids classes, location, and class timing.",
  },
  {
    title: "Move prospects toward trials",
    body: "Instead of letting a caller disappear, it recommends the right next step and gives your team a clear follow-up summary.",
  },
  {
    title: "Cover the front desk gaps",
    body: "It stays available while coaches are teaching, training, closing, or away from the phone, so valuable calls still get handled.",
  },
];

const flow = [
  {
    title: "Answer",
    body: "Greets callers immediately as The Academy's assistant.",
  },
  {
    title: "Understand",
    body: "Identifies whether they are a new student, member, parent, or schedule inquiry.",
  },
  {
    title: "Qualify",
    body: "Asks the questions your staff would need before following up.",
  },
  {
    title: "Guide",
    body: "Points the caller toward the right program or next step.",
  },
  {
    title: "Summarize",
    body: "Sends a clean call summary so the lead is easy to act on.",
  },
];

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
            <h2>Turn missed calls into booked trial-class opportunities.</h2>
            <p>
              This voice AI receptionist is built for The Academy MMA&apos;s owner and team:
              fewer lost inquiries, faster answers for prospects, and cleaner follow-up for
              every call that comes in while staff are busy coaching.
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
          <p className="eyebrow">Owner Outcomes</p>
          <h2>Built to protect revenue that starts with a phone call.</h2>
          <p>
            The goal is not to replace your staff. It is to make sure interested students get a
            useful response, and your team gets the details needed to close the loop.
          </p>
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
            <h2>The best leads often call when nobody can pick up.</h2>
            <p>
              The Academy runs a packed schedule across striking, grappling, kids programs,
              and open training. During those hours, even a short missed call can mean a
              beginner never books a trial class. The voice AI keeps that conversation alive.
            </p>
          </div>
          <div className="check-grid">
            <div>Capture trial-class intent before it goes cold</div>
            <div>Give staff a concise summary after each call</div>
            <div>Answer first-time questions instantly</div>
            <div>Stay available during classes and after hours</div>
            <div>Ask consistent intake questions every time</div>
            <div>Escalate billing, private training, and sensitive issues</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Call Flow</p>
          <h2>A front-desk conversation your team can actually use.</h2>
        </div>
        <div className="flow-grid">
          {flow.map((step, index) => (
            <article className="flow-card" key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
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
