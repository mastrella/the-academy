# The Academy MMA Voice AI Site

## Deploy on Vercel

This is a Next.js site with an embedded Retell web-call demo.

## Local setup

Create `.env.local`:

```bash
RETELL_API_KEY=your_retell_api_key
RETELL_AGENT_ID=agent_01589e1e2e90c7e4e79454cd90
RETELL_AGENT_VERSION=1
```

Install and run:

```bash
npm install
npm run dev
```

## Vercel

Add the same environment variables in Vercel. The build command is `npm run build`.
