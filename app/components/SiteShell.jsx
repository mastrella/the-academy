import Link from "next/link";
import { directNavLinks, navGroups, site } from "../data/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="announcement">
        <Link href="/free-trial">Class spots limited. Claim your free trial.</Link>
      </div>

      <div className="brand-strip">
        <Link className="logo-link" href="/" aria-label="The Academy Toronto home">
          <img src={site.logo} alt="The Academy Toronto" />
        </Link>
        <div className="quick-contact">
          <span>{site.shortAddress}</span>
          <span>Toronto, ON, M4S 2Y9</span>
          <a href={`tel:${site.phone.replace(/-/g, "")}`}>{site.phone}</a>
        </div>
      </div>

      <nav className="main-nav" aria-label="Primary navigation">
        {navGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <span>{group.label}</span>
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
          <Link className="nav-direct" href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-info">
        <div>
          <h2>Locate Us</h2>
          <p>
            <strong>{site.name}</strong>
            <br />
            33 Davisville Ave,
            <br />
            Toronto, Ontario, M4S 2Y9
          </p>
        </div>
        <div>
          <h2>Contact Us</h2>
          <p>
            <strong>Email: </strong>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>
            <strong>Telephone: </strong>
            <a href={`tel:${site.phone.replace(/-/g, "")}`}>{site.phone}</a>
          </p>
          <p>Gym opening hours varies by location.</p>
        </div>
      </div>
      <div className="social-row">
        <a href={`mailto:${site.email}`}>Email</a>
        <a href={site.facebook} target="_blank" rel="noreferrer">
          Facebook
        </a>
        <a href={site.instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>
      </div>
      <p className="site-credit">
        33 Davisville Ave. Toronto, hosted by{" "}
        <a href="http://www.striation6.com/" target="_blank" rel="noreferrer">
          Striation 6
        </a>{" "}
        | <Link href="/privacy-policy">privacy policy</Link>
      </p>
    </footer>
  );
}

export default function SiteShell({ children }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
