const routes = [
  "",
  "/academy-toronto",
  "/programs",
  "/private-instruction",
  "/coaching-team",
  "/rules",
  "/toronto-schedule",
  "/contact",
  "/free-trial",
  "/promo",
  "/privacy-policy",
];

export default function sitemap() {
  const baseUrl = "https://www.theacademytoronto.ca";

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/free-trial" ? 0.9 : 0.7,
  }));
}
