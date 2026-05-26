import Link from "next/link";
import LeadForm from "./LeadForm";
import ProgramExplorer from "./ProgramExplorer";
import {
  academyTenets,
  assets,
  coaches,
  programRules,
  programs,
  safetyRules,
  site,
} from "../data/site";

export function PageIntro({ title, eyebrow, children, centered = false }) {
  return (
    <section className={`page-intro ${centered ? "centered" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {children ? <div className="intro-copy">{children}</div> : null}
    </section>
  );
}

function GoogleReviewsSection({ compact = false }) {
  return (
    <section className={compact ? "reviews-proof compact" : "reviews-proof"}>
      <div className="reviews-proof-copy">
        <p className="eyebrow">Trusted by students</p>
        <h2>Well-reviewed martial arts training in Midtown Toronto.</h2>
        <p>
          Students consistently point to the coaching, training culture, safety standards, and
          serious-but-welcoming atmosphere.
        </p>
        <div className="review-actions">
          <a
            className="button button-primary"
            href="https://www.google.com/search?q=The+Academy+Toronto+33+Davisville+Ave+reviews"
            target="_blank"
            rel="noreferrer"
          >
            Read Google Reviews
          </a>
          <Link className="button button-secondary" href="/free-trial">
            Try a Class
          </Link>
        </div>
      </div>
      <div className="review-score-card">
        <span>Google Reviews</span>
        <strong>Highly rated</strong>
        <div className="stars" aria-label="Five star rating">
          *****
        </div>
        <p>Public review listings show The Academy among Toronto martial arts gyms with a strong review profile.</p>
      </div>
    </section>
  );
}

export function HomePage() {
  const pathways = [
    {
      title: "Start Training",
      image: assets.teamwork,
      body: "Book a free trial and get guided into the right first class for your goals, schedule, and experience level.",
      href: "/free-trial",
      cta: "Claim trial",
    },
    {
      title: "Choose a Program",
      image: assets.martialArts,
      body: "Explore BJJ, No Gi, Judo, Wrestling, Kickboxing, Adult Gymnastics, and Youth programs.",
      href: "/programs",
      cta: "Explore classes",
    },
    {
      title: "Questions Before Class?",
      image: assets.discipline,
      body: "Get quick answers about class times, what to bring, where to go, and how to start.",
      href: "/contact",
      cta: "Get answers",
    },
  ];

  return (
    <main>
      <section className="home-hero premium-hero">
        <img src={assets.hero} alt="Brazilian Jiu Jitsu training at The Academy Toronto" />
        <div className="hero-copy">
          <p className="eyebrow">Midtown Toronto martial arts</p>
          <h1>Train seriously. Start confidently.</h1>
          <p>
            Brazilian Jiu Jitsu, Judo, Kickboxing, Wrestling, Adult Gymnastics, and Youth
            programs at 33 Davisville Ave.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/free-trial">
              Claim a Free Trial
            </Link>
            <Link className="button button-secondary" href="/programs">
              View Programs
            </Link>
          </div>
        </div>
      </section>

      <section className="pathway-section">
        <div className="section-heading centered">
          <p className="eyebrow">A clearer path in</p>
          <h2>Your first week starts here.</h2>
          <p>
            Step onto the mats, meet the coaches, and find the class that fits how you want to
            train.
          </p>
        </div>
        <div className="pathway-grid">
          {pathways.map((pathway) => (
            <article className="pathway-card" key={pathway.title}>
              <img src={pathway.image} alt="" />
              <div>
                <h3>{pathway.title}</h3>
                <p>{pathway.body}</p>
                <Link href={pathway.href}>{pathway.cta}</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <GoogleReviewsSection />

      <ProgramExplorer compact />

      <section className="image-band">
        {assets.gallery.map((image) => (
          <img src={image} alt="The Academy Toronto training floor" key={image} />
        ))}
      </section>

      <section className="content-section">
        <div className="section-title centered">
          <h2>What People Are Saying</h2>
        </div>
        <div className="review-grid">
          {assets.reviews.map((image, index) => (
            <img src={image} alt={`The Academy Toronto review ${index + 1}`} key={image} />
          ))}
        </div>
        <div className="centered cta-row">
          <Link className="button button-primary" href="/free-trial">
            Claim your free week trial
          </Link>
        </div>
      </section>

      <section className="conversion-band">
        <div>
          <p className="eyebrow">Start here</p>
          <h2>Try a class before you commit.</h2>
          <p>
            Come in, meet the team, and see how the training feels before making a decision.
          </p>
        </div>
        <Link className="button button-primary" href="/free-trial">
          Claim a Free Trial
        </Link>
      </section>
    </main>
  );
}

export function LocationPage() {
  const amenities = [
    "Fob-access facility",
    "Full complimentary access to the 6,000 square foot training facilities at the attached Striation6 gym",
    "Vending machine stocked with healthy drinks and snacks",
    "Complimentary water fountains",
    "Complimentary espresso",
    "Large change rooms and showers",
    "Complimentary access to the sauna",
  ];

  const included = [
    "Two mat areas",
    "Spacious change rooms and showers",
    "Gym facilities hosted by Striation6",
    "Vending machine",
    "Supplement shop",
    "And more",
  ];

  return (
    <main>
      <PageIntro title="The Academy Toronto">
        <p>Visit the Academy inside Striation6 at Yonge and Davisville.</p>
      </PageIntro>

      <section className="location-hero content-section">
        <div className="map-panel">
          <iframe
            title="Map to The Academy Toronto"
            src="https://www.google.com/maps?q=33%20Davisville%20Ave%2C%20Toronto%2C%20ON%20M4S%202Y9&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-pin-card">
            <strong>The Academy Toronto</strong>
            <span>33 Davisville Ave</span>
          </div>
        </div>
        <div className="arrival-panel">
          <p className="eyebrow">Find us fast</p>
          <h2>33 Davisville Ave, basement level.</h2>
          <p>
            Located inside Striation6 near Davisville Station. Arrive 15-20 minutes early for a
            trial class so there is time for the waiver, tour, and class setup.
          </p>
          <div className="arrival-actions">
            <a className="button button-primary" href="https://www.google.com/maps/search/?api=1&query=33+Davisville+Ave+Toronto+ON" target="_blank" rel="noreferrer">
              Open Map
            </a>
            <Link className="button button-secondary" href="/free-trial">
              Book Trial
            </Link>
          </div>
        </div>
      </section>

      <section className="two-column content-section">
        <div>
          <h2>Amenities</h2>
          <ul className="check-list">
            {amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="detail-card">
          <h2>Contact</h2>
          <p>
            Basement level - Located inside{" "}
            <a href="https://www.striation6.com/" target="_blank" rel="noreferrer">
              Striation6
            </a>
          </p>
          <p>
            33 Davisville Ave.
            <br />
            Toronto, ON M4S 2Y9
            <br />
            Canada
          </p>
          <p>
            T: <a href={`tel:${site.phone.replace(/-/g, "")}`}>{site.phone}</a>
            <br />
            E: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </section>

      <section className="content-section">
        <h2>Our Academy Toronto location includes:</h2>
        <div className="tile-grid">
          {included.map((item) => (
            <div className="simple-tile" key={item}>
              {item}
            </div>
          ))}
        </div>
        <p className="inline-cta">
          Click to <Link href="/toronto-schedule">view The Academy Toronto class schedule.</Link>
        </p>
      </section>
    </main>
  );
}

export function ProgramsPage() {
  return (
    <main>
      <PageIntro title="Programs">
        <p>Explore the training options and choose the best starting point.</p>
      </PageIntro>
      <ProgramExplorer />
      <section className="cta-panel">
        <h2>Not sure which class fits?</h2>
        <p>Start with a free trial and the team will guide you toward the right program.</p>
        <Link className="button button-primary" href="/free-trial">
          Claim a Free Trial
        </Link>
      </section>
    </main>
  );
}

export function PrivateInstructionPage() {
  return (
    <main>
      <PageIntro title="Private Instruction" />
      <section className="content-section two-column">
        <article className="program-block">
          <h2>One Hour Private Session</h2>
          <p>Please inquire for rates.</p>
          <p>
            Private instruction is a great way to master the fundamentals or tailor a
            particular skill. Private classes can be split between two students for a
            semi-private session. Classes may be arranged in-house or off-site.
          </p>
          <p>Non-Academy members are welcome to inquire about private instruction.</p>
          <Link className="button button-secondary" href="/contact">
            Inquire about a Private Class
          </Link>
        </article>
        <article className="program-block">
          <h2>Ten Private Classes Package</h2>
          <p>Please inquire for rates.</p>
          <p>
            A package is ideal when you want focused technical development, fundamentals,
            confidence, or event preparation across multiple sessions.
          </p>
          <Link className="button button-secondary" href="/contact">
            Inquire about Private Instruction Package
          </Link>
        </article>
      </section>

      <section className="content-section">
        <h2>Privates Offered In:</h2>
        <div className="tile-grid">
          {["Brazilian Jiu Jitsu", "Judo", "Self defence", "Sanda Kickboxing", "Choy Lee Fut Kung fu", "Wrestling"].map(
            (item) => (
              <div className="simple-tile" key={item}>
                {item}
              </div>
            ),
          )}
        </div>
      </section>

      <section className="content-section narrow">
        <LeadForm source="private_instruction" title="Request Private Instruction" />
      </section>
    </main>
  );
}

export function CoachingTeamPage() {
  return (
    <main>
      <PageIntro title="Coaching Team" centered>
        <p>Meet the coaches leading Brazilian Jiu Jitsu, Sanda, Judo, Wrestling, and youth programs.</p>
      </PageIntro>
      <section className="content-section">
        <div className="coach-grid">
          {coaches.map((coach) => (
            <article className="coach-card" key={coach.name}>
              <img src={coach.image} alt={coach.name} />
              <div>
                <p className="eyebrow">Coach</p>
                <h2>{coach.name}</h2>
                <ul>
                  {coach.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Link className="coach-link" href="/free-trial">
                  Train with the team
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export function RulesPage() {
  return (
    <main>
      <PageIntro title="Academy Safety and Etiquette Requirements" />
      <section className="content-section">
        <h2>Academy Tenets</h2>
        <div className="tile-grid three">
          {academyTenets.map((tenet) => (
            <div className="simple-tile" key={tenet}>
              {tenet}
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2>Across All Programs</h2>
        <p className="lead">Safety is our top concern. Please consider your training partners safety at all times.</p>
        <ul className="check-list">
          {safetyRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      <section className="content-section">
        <div className="rule-grid">
          {programRules.map((group) => (
            <article className="detail-card" key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export function SchedulePage() {
  return (
    <main>
      <PageIntro title="Schedule - Academy Toronto" centered>
        <p>Current Academy schedule for 33 Davisville Ave.</p>
      </PageIntro>
      <section className="content-section">
        <img className="schedule-image" src={assets.schedule} alt="The Academy Toronto class schedule" />
      </section>
    </main>
  );
}

export function ContactPage() {
  return (
    <main>
      <PageIntro title="Contact" />
      <section className="content-section two-column">
        <div className="detail-card">
          <h2>Yonge and Davisville</h2>
          <p>
            Located inside{" "}
            <a href="https://www.striation6.com/" target="_blank" rel="noreferrer">
              Striation6
            </a>
          </p>
          <p>
            33 Davisville Ave.
            <br />
            Toronto, ON M4S 2Y9
          </p>
          <p>
            T: <a href={`tel:${site.phone.replace(/-/g, "")}`}>{site.phone}</a>
            <br />
            E: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <div className="social-row left">
            <a href={site.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
        <LeadForm source="contact_page" title="Get in Touch" />
      </section>
    </main>
  );
}

export function FreeTrialPage() {
  return (
    <main>
      <section className="free-trial-hero">
        <div>
          <p>We offer free trial classes at The Academy if you are a potential student.</p>
          <p>
            Please arrive 15-20 minutes early to sign a waiver and get acquainted with the
            facilities.
          </p>
        </div>
        <h1>Free Trial</h1>
      </section>

      <section className="content-section two-column">
        <div>
          <img className="feature-photo" src={assets.freeTrial} alt="The Academy Toronto training" />
          <h2>Please note:</h2>
          <p>
            The Academy membership is by invitation only. At the end of the trial week, The
            Academy coaches will decide if the applicant is eligible for membership based on the
            guidelines below.
          </p>
          <p>We are looking for pupils who show:</p>
          <ul className="check-list">
            {academyTenets.map((tenet) => (
              <li key={tenet}>{tenet}</li>
            ))}
          </ul>
          <p>Physical strength or athletic ability are not requirements for acceptance to The Academy.</p>
        </div>
        <LeadForm source="free_trial" title="Claim Your Free Trial" />
      </section>
      <GoogleReviewsSection compact />
      <section className="conversion-band">
        <div>
          <p className="eyebrow">Need help choosing?</p>
          <h2>Questions before your first class?</h2>
          <p>
            Ask about schedules, trial classes, what to bring, and which program fits your goals.
          </p>
        </div>
        <Link className="button button-secondary" href="/contact">
          Contact the Team
        </Link>
      </section>
    </main>
  );
}

export function PromoPage() {
  return (
    <main>
      <section className="promo-page">
        <img src={site.logo} alt="The Academy Toronto" />
        <h1>The Academy Toronto</h1>
        <h2>Free Week Trial + Uniform</h2>
        <p>Plus for a limited time: additional 15% off membership.</p>
        <p>Discipline | Teamwork | Sportsmanship</p>
        <p>What could your child do if anything were possible?</p>
        <Link className="button button-primary" href="/free-trial">
          Yes, I want to claim a free week trial
        </Link>
      </section>
    </main>
  );
}

export function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Section 1 - What Do We Do With Your Information?",
      body: [
        "When you purchase something from us, as part of the buying and selling process, we collect the personal information you give us such as your name, address, and email address.",
        "When you browse our website, we also automatically receive your computer's internet protocol address in order to provide information that helps us learn about your browser and operating system.",
        "Email marketing: with your permission, we may send you emails about our services, new offerings, and other updates.",
      ],
    },
    {
      title: "Section 2 - Consent",
      body: [
        "When you provide personal information to complete a transaction, we imply that you consent to our collecting it and using it for that specific reason only.",
        "If we ask for your personal information for a secondary reason, like marketing, we will either ask directly for expressed consent or provide an opportunity to say no.",
        "You may withdraw your consent at any time by contacting us at dino@theacademytoronto.ca or mailing The Academy Toronto at 33 Davisville Ave., Toronto, Ontario M4S 2Y9.",
      ],
    },
    {
      title: "Section 3 - Disclosure",
      body: ["We may disclose your personal information if required by law or if you violate our Terms of Service."],
    },
    {
      title: "Section 4 - Third-Party Services",
      body: [
        "Third-party providers generally collect, use, and disclose information only to the extent necessary to perform the services they provide to us.",
        "Once you leave our website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy.",
      ],
    },
    {
      title: "Section 5 - Security",
      body: [
        "We take reasonable precautions and follow industry best practices to make sure personal information is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.",
      ],
    },
    {
      title: "Section 6 - Age of Consent",
      body: [
        "By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you have given consent to allow minor dependents to use this site.",
      ],
    },
    {
      title: "Section 7 - Changes to This Privacy Policy",
      body: [
        "We reserve the right to modify this privacy policy at any time. Changes and clarifications take effect immediately upon posting.",
      ],
    },
    {
      title: "Questions and Contact Information",
      body: [
        "To access, correct, amend, or delete personal information, register a complaint, or request more information, contact Dino at dino@theacademytoronto.ca.",
      ],
    },
  ];

  return (
    <main>
      <PageIntro title="Privacy Policy" />
      <section className="content-section stacked">
        {sections.map((section) => (
          <article className="program-block" key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </section>
    </main>
  );
}
