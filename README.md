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

## Retell post-call lead webhook

This project includes a serverless webhook at:

```text
/api/retell-webhook
```

After deploying to Vercel, use this Retell webhook URL:

```text
https://your-vercel-domain.vercel.app/api/retell-webhook
```

Add these environment variables in Vercel:

```bash
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
LEAD_EMAIL_TO=where_leads_should_be_sent@example.com
```

Do not use your normal Gmail password. Create a Gmail app password and use that for `GMAIL_APP_PASSWORD`.

In Retell, create post-call analysis fields with these exact keys:

```text
customer_name
customer_phone
customer_email
training_interest
experience_level
preferred_class_time
lead_quality
call_summary
transcript
recording_url
```

The webhook processes `call_analyzed` events. If Retell sends another event type, the route acknowledges it and ignores it.

To test locally, run the dev server and send a sample webhook:

```bash
npm.cmd run dev
```

```bash
curl -X POST http://localhost:3000/api/retell-webhook \
  -H "Content-Type: application/json" \
  -d "{\"event\":\"call_analyzed\",\"call\":{\"call_id\":\"test-call-123\",\"call_analysis\":{\"custom_analysis_data\":{\"customer_name\":\"Test Lead\",\"customer_phone\":\"555-555-5555\",\"customer_email\":\"test@example.com\",\"training_interest\":\"MMA\",\"experience_level\":\"Beginner\",\"preferred_class_time\":\"Evenings\",\"lead_quality\":\"High\",\"call_summary\":\"Interested in a trial class.\",\"transcript\":\"Caller asked about beginner MMA classes.\",\"recording_url\":\"https://example.com/recording.mp3\"}}}}"
```
