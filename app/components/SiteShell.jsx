import Link from "next/link";
import { directNavLinks, navGroups, site } from "../data/site";
import AiWidget from "./AiWidget";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="announcement">
        <span>Limited trial spots available this week</span>
        <Link href="/free-trial">Claim your free trial</Link>
      </div>

      <div className="brand-strip">
        <Link className="brand-lockup" href="/" aria-label="The Academy Toronto home">
          <img src={site.logo} alt="" />
          <span>
            <strong>The Academy Toronto</strong>
            <small>Martial arts at Yonge and Davisville</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Primary navigation">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <button type="button">{group.label}</button>
              <div className="nav-menu">
                {group.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {directNavLinks.map((link) => (
            <Link
              className={link.href === "/free-trial" ? "nav-direct nav-trial" : "nav-direct"}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <details className="mobile-nav">
          <summary className="mobile-nav-toggle" aria-label="Open navigation menu">
            <span className="mobile-nav-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </summary>
          <nav className="mobile-nav-panel" aria-label="Mobile navigation">
            {navGroups.map((group) => (
              <div className="mobile-nav-section" key={group.label}>
                <span>{group.label}</span>
                {group.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mobile-nav-section mobile-nav-actions">
              {directNavLinks.map((link) => (
                <Link
                  className={link.href === "/free-trial" ? "mobile-nav-cta" : ""}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
              <a href={`tel:${site.phone.replace(/-/g, "")}`}>{site.phone}</a>
            </div>
          </nav>
        </details>

        <div className="header-actions" aria-label="Contact and trial links">
          <a className="phone-link" href={`tel:${site.phone.replace(/-/g, "")}`}>
            {site.phone}
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const footerGroups = [
    {
      title: "Train",
      links: [
        { href: "/programs", label: "Programs" },
        { href: "/private-instruction", label: "Private Instruction" },
        { href: "/toronto-schedule", label: "Schedule" },
      ],
    },
    {
      title: "Academy",
      links: [
        { href: "/academy-toronto", label: "Location" },
        { href: "/coaching-team", label: "Coaches" },
        { href: "/rules", label: "Safety and Etiquette" },
      ],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <img src={site.logo} alt="" />
          <h2>The Academy Toronto</h2>
          <p>Brazilian Jiu Jitsu, Judo, Kickboxing, Wrestling, Adult Gymnastics, and Youth programs at Yonge and Davisville.</p>
          <Link className="button button-primary" href="/free-trial">
            Claim a Free Trial
          </Link>
        </div>

        {footerGroups.map((group) => (
          <div className="footer-links" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="footer-contact">
          <h3>Visit</h3>
          <p>
            33 Davisville Ave
            <br />
            Toronto, ON M4S 2Y9
            <br />
            Basement level inside Striation6
          </p>
          <a href={`tel:${site.phone.replace(/-/g, "")}`}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <div className="footer-socials">
            <a href={site.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>33 Davisville Ave. Toronto</span>
        <span>
          Hosted by{" "}
          <a href="http://www.striation6.com/" target="_blank" rel="noreferrer">
            Striation6
          </a>
        </span>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
}

export default function SiteShell({ children }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <div className="mobile-cta-bar" aria-label="Quick actions">
        <a href={`tel:${site.phone.replace(/-/g, "")}`}>Call</a>
        <a href={`sms:${site.phone.replace(/-/g, "")}`}>Text</a>
        <Link href="/free-trial">Free Trial</Link>
      </div>
      <AiWidget />
    </>
  );
}
