# The Academy Website Implementation Checklist

## Goal

Rebuild The Academy Toronto website as a controlled Next.js project, first as a faithful replica of the current public website, then upgrade it with lead capture, voice/chat agents, email/SMS automation, SEO/AEO/GEO optimization, and analytics.

## Current Status

- [x] First-pass Next.js replica scaffold is built and running locally.
- [x] All major public routes return 200 locally.
- [x] Lead form and lead API scaffold exist.
- [x] Local environment template exists.
- [x] Retell voice agent API key is present locally; live call still needs manual microphone/browser verification.
- [ ] Retell chat widget is blocked until `RETELL_CHAT_AGENT_ID` is added to `.env.local`.
- [ ] Leads are not yet stored in a real database.
- [ ] Email automation is not yet connected.
- [ ] SMS/admin notification automation is not yet connected.
- [ ] Analytics are not yet connected.
- [ ] SEO/AEO/GEO implementation is not yet complete.

## Key Source Pages Reviewed

- [x] Home: https://www.theacademytoronto.ca/
- [x] Academy Toronto location: https://www.theacademytoronto.ca/academy-toronto
- [x] Programs: https://www.theacademytoronto.ca/programs
- [x] Private Instruction: https://www.theacademytoronto.ca/private-instruction
- [x] Coaching Team: https://www.theacademytoronto.ca/coaching-team
- [x] Safety and Etiquette: https://www.theacademytoronto.ca/rules
- [x] Toronto Schedule: https://www.theacademytoronto.ca/toronto-schedule
- [x] Contact: https://www.theacademytoronto.ca/contact
- [x] Free Trial: https://www.theacademytoronto.ca/free-trial
- [x] Promo: https://www.theacademytoronto.ca/promo
- [x] Privacy Policy: https://www.theacademytoronto.ca/privacy-policy

## Important Assumptions

- [ ] Confirm we are authorized to recreate The Academy website, brand, copy, photos, logo, testimonials, and other assets.
- [ ] Confirm whether old indexed Scarborough pages should be restored, redirected, or removed from search.
- [ ] Confirm final phone number, admin email, SMS recipient numbers, and location details.
- [ ] Confirm whether the first build should be an exact visual replica before enhancements.

## Recommended Stack

- [x] Frontend: Next.js App Router.
- [ ] Hosting: Vercel.
- [x] Styling: local CSS or Tailwind, following a reusable component system.
- [ ] Lead database: Supabase or Airtable.
- [ ] Email: Resend.
- [ ] SMS/admin texts: Twilio.
- [x] Voice agent: Retell first, since the repo already has Retell integration.
- [ ] Chat agent: custom chat UI or ElevenLabs widget.
- [ ] Analytics: PostHog for funnels and CTA events.
- [ ] Heatmaps/session recordings: Microsoft Clarity.
- [ ] SEO reporting: Google Search Console and GA4.

## Phase 1: Discovery and Asset Capture

- [ ] Screenshot every current public page on desktop.
- [ ] Screenshot every current public page on tablet.
- [ ] Screenshot every current public page on mobile.
- [ ] Inventory navigation structure.
- [ ] Inventory fonts, colors, spacing, buttons, and layout patterns.
- [ ] Inventory all images and logos.
- [ ] Inventory testimonials/reviews.
- [ ] Inventory all CTAs.
- [ ] Inventory all forms or missing form placements.
- [ ] Inventory footer content and social links.
- [ ] Confirm active locations.
- [ ] Confirm schedule source and whether it should be HTML, image, embedded calendar, or CMS-managed.
- [ ] Confirm current privacy/consent requirements.

## Phase 2: Exact Replica Build

- [x] Create route: `/`.
- [x] Create route: `/academy-toronto`.
- [x] Create route: `/programs`.
- [x] Create route: `/private-instruction`.
- [x] Create route: `/coaching-team`.
- [x] Create route: `/rules`.
- [x] Create route: `/toronto-schedule`.
- [x] Create route: `/contact`.
- [x] Create route: `/free-trial`.
- [x] Create route: `/promo`.
- [x] Create route: `/privacy-policy`.
- [x] Build shared header.
- [x] Build desktop navigation.
- [x] Build mobile navigation.
- [x] Build shared footer.
- [x] Build shared CTA components.
- [x] Build shared image sections.
- [x] Build shared review/testimonial sections.
- [x] Build shared location/contact blocks.
- [x] Add all approved current copy.
- [x] Add all approved current assets.
- [x] Match responsive behavior.
- [x] Test all internal links.
- [x] Add first-pass redirects for likely stale schedule/trial/Scarborough URLs.

## Phase 3: Lead Capture System

- [x] Create lead form component.
- [x] Add lead form to Contact page.
- [x] Add lead form to Free Trial page.
- [x] Add lead form to Private Instruction page.
- [x] Add lead form CTA sections to high-intent pages.
- [x] Capture name.
- [x] Capture phone number.
- [x] Capture email.
- [x] Capture program interest.
- [x] Capture adult/kids/youth category.
- [x] Capture experience level.
- [x] Capture preferred class time.
- [x] Capture preferred contact method.
- [x] Capture source page.
- [x] Capture UTM parameters.
- [x] Capture consent for email.
- [x] Capture consent for SMS.
- [ ] Store lead in database.
- [ ] Add duplicate detection by email/phone.
- [ ] Add lead statuses: new, contacted, booked trial, no-show, member, lost.
- [x] Add server-side validation.
- [x] Add basic honeypot and too-fast-submit spam protection.

## Phase 4: Email and SMS Automation

- [ ] Add Resend API integration.
- [ ] Add client confirmation email.
- [ ] Add admin notification email.
- [ ] Add configurable email template.
- [ ] Add Twilio API integration.
- [ ] Add client SMS confirmation for opted-in leads.
- [ ] Add admin SMS notification.
- [ ] Include name, phone, email, program interest, goals, and source in admin notifications.
- [ ] Include voice/chat transcript summary when available.
- [ ] Log email delivery status.
- [ ] Log SMS delivery status.
- [ ] Add failure handling and retry notes.

## Phase 5: Voice and Chat Agent

- [ ] Decide final provider: Retell, ElevenLabs, or hybrid.
- [ ] Build agent knowledge base from site content.
- [ ] Teach agent programs: BJJ, No Gi, Judo, Kickboxing/Sanda, Wrestling, Adult Gymnastics, Kids/Youth.
- [ ] Teach agent location details.
- [ ] Teach agent free trial process.
- [ ] Teach agent schedule answers.
- [ ] Teach agent private instruction answers.
- [ ] Teach agent safety/etiquette answers.
- [ ] Require agent to collect name.
- [ ] Require agent to collect phone.
- [ ] Require agent to collect email.
- [ ] Ask program interest.
- [ ] Ask goals.
- [ ] Ask experience level.
- [ ] Ask preferred class time.
- [ ] Ask adult/youth/kids category when relevant.
- [ ] Create lead from voice call.
- [ ] Create lead from chat.
- [x] Add bottom-right AI widget shell with voice and chat tabs.
- [x] Add server-side Retell chat session and completion routes.
- [ ] Send confirmation email after qualified lead capture.
- [ ] Send confirmation SMS after qualified lead capture.
- [ ] Notify gym admin after qualified lead capture.
- [ ] Add escalation rules for billing, injury, medical, safety, membership approval, and private pricing.
- [ ] Add transcript summary.
- [ ] Add analytics events for voice/chat starts and completions.

## Phase 6: SEO, AEO, GEO, and Technical Optimization

- [ ] Add unique title and description for every page.
- [ ] Add canonical URLs.
- [ ] Add Open Graph metadata.
- [ ] Add Twitter/social metadata.
- [x] Add sitemap.xml.
- [x] Add robots.txt.
- [x] Add LocalBusiness structured data.
- [x] Add SportsActivityLocation structured data.
- [ ] Add Organization structured data.
- [ ] Add FAQ structured data where appropriate.
- [ ] Add breadcrumb structured data where appropriate.
- [ ] Add answer-focused FAQ sections.
- [ ] Add page for Brazilian Jiu Jitsu Toronto.
- [ ] Add page for Kickboxing Toronto.
- [ ] Add page for Judo Toronto.
- [ ] Add page for Wrestling Toronto.
- [ ] Add page for Kids Martial Arts Toronto.
- [ ] Add page for Private Martial Arts Lessons Toronto.
- [ ] Add location-focused content for Davisville, Midtown Toronto, and Yonge and Eglinton.
- [ ] Improve image alt text.
- [ ] Optimize image size and format.
- [ ] Improve accessibility landmarks.
- [ ] Improve heading hierarchy.
- [ ] Test Core Web Vitals.
- [ ] Submit sitemap to Google Search Console.

## Phase 7: Analytics and Reporting

- [ ] Add PostHog.
- [ ] Add GA4.
- [ ] Add Microsoft Clarity.
- [ ] Track page views.
- [ ] Track CTA clicks.
- [ ] Track phone link clicks.
- [ ] Track email link clicks.
- [ ] Track free trial form starts.
- [ ] Track free trial submissions.
- [ ] Track contact form submissions.
- [ ] Track private instruction inquiries.
- [ ] Track voice agent starts.
- [ ] Track voice agent completed leads.
- [ ] Track chat starts.
- [ ] Track chat completed leads.
- [ ] Track email automation success/failure.
- [ ] Track SMS automation success/failure.
- [ ] Build funnel: visitor to CTA click.
- [ ] Build funnel: CTA click to lead.
- [ ] Build funnel: lead to booked trial.
- [ ] Build dashboard for visitors, conversions, top pages, top CTAs, and lead source.

## Top 20 Website Improvements

- [x] Remove "Your Custom Text Here."
- [x] Fix inconsistent phone numbers.
- [ ] Replace image-only schedule with accessible HTML schedule.
- [x] Add real contact and free trial forms.
- [x] Add sticky mobile CTA: Call, Text, Free Trial.
- [x] Add clearer hero offer above the fold.
- [ ] Add program-specific landing pages.
- [ ] Add kids/youth class page.
- [x] Add private instruction conversion page.
- [ ] Add testimonials as real text, not only images.
- [ ] Add Google review integration or curated reviews where appropriate.
- [x] Add map and entrance details.
- [x] Add structured data.
- [x] Improve mobile navigation.
- [ ] Compress and optimize images.
- [x] Fix first-pass stale 404 pages with redirects.
- [ ] Add FAQ content for search and AI answer engines.
- [ ] Add analytics events on every CTA.
- [ ] Add automated lead follow-up.
- [ ] Add voice/chat agent that captures leads while staff are busy.
- [x] Add polished bottom-right voice/chat widget UI; chat requires `RETELL_CHAT_AGENT_ID`.

## Provider Research Links

- [ ] Retell create web call docs: https://docs.retellai.com/api-references/create-web-call
- [ ] Retell web call deployment docs: https://docs.retellai.com/deploy/web-call
- [ ] ElevenLabs conversational widget docs: https://elevenlabs.io/docs/agents-platform/customization/widget
- [ ] Twilio Node SDK docs: https://www.twilio.com/docs/libraries/reference/twilio-node/index.html
- [ ] Twilio SMS docs: https://www.twilio.com/docs/guides/sms/how-to-send-sms-messages-in-node-js
- [ ] Resend docs: https://resend.com/docs
- [ ] Resend Next.js docs: https://resend.com/nextjs
- [ ] Google LocalBusiness structured data docs: https://developers.google.com/search/docs/appearance/structured-data/local-business
- [ ] Schema.org LocalBusiness: https://schema.org/LocalBusiness
- [ ] PostHog: https://posthog.com/
- [ ] Microsoft Clarity docs: https://learn.microsoft.com/en-us/clarity/
- [ ] GA4 Measurement Protocol: https://support.google.com/analytics/answer/9900444

## Environment Variables To Plan For

- [ ] `RETELL_API_KEY` - template added, real value needed
- [x] `RETELL_AGENT_ID` - default/template added
- [x] `RETELL_AGENT_VERSION` - default/template added
- [ ] `RESEND_API_KEY` - template added, real value needed
- [ ] `EMAIL_FROM` - template added, real value needed
- [x] `ADMIN_EMAIL` - default/template added
- [ ] `TWILIO_ACCOUNT_SID` - template added, real value needed
- [ ] `TWILIO_AUTH_TOKEN` - template added, real value needed
- [ ] `TWILIO_FROM_NUMBER` - template added, real value needed
- [ ] `ADMIN_SMS_NUMBER` - template added, real value needed
- [ ] `DATABASE_URL` or Supabase keys - template added, real value needed
- [ ] `NEXT_PUBLIC_POSTHOG_KEY` - template added, real value needed
- [x] `NEXT_PUBLIC_POSTHOG_HOST` - default/template added
- [ ] `NEXT_PUBLIC_GA_ID` - template added, real value needed
- [ ] `NEXT_PUBLIC_CLARITY_ID` - template added, real value needed

## First Milestone

- [x] Build the full current-site replica in Next.js.
- [x] Confirm every public page exists.
- [x] Confirm every current navigation link works.
- [ ] Confirm desktop/mobile screenshots match the current site closely.
- [ ] Deploy preview build.
- [ ] Review with stakeholder.
- [ ] Then begin automation and optimization layers.
