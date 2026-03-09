# Vercel Environment Variables Checklist

The following environment variables must be added to your Vercel project settings:

## Required
| Variable Name | Description | Where to get the value | 
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL | Supabase Dashboard > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Project Anon Key | Supabase Dashboard > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase Project Service Role Key | Supabase Dashboard > Settings > API (Keep secret!) |
| `NEXT_PUBLIC_SITE_URL` | Your public site URL | e.g., `https://www.strangermingle.com` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Your Razorpay API Key ID | Razorpay Dashboard > Settings > API Keys |
| `RAZORPAY_KEY_SECRET` | Your Razorpay API Key Secret | Razorpay Dashboard > Settings > API Keys |
| `RAZORPAY_WEBHOOK_SECRET` | Your Razorpay Webhook Secret | Razorpay Dashboard > Settings > Webhooks |
| `NEXT_PUBLIC_APP_ENV` | Application environment | Set to `production` |
| `RESEND_API_KEY` | Your Resend API Key | Resend Dashboard > API Keys |

## Optional
| Variable Name | Description | Where to get the value |
| --- | --- | --- |
| `CRON_SECRET` | Secret to protect cron jobs | Generate a random string (Optional, but recommended) |

> [!IMPORTANT]
> Ensure that `SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET` are never exposed in client-side code. Use `src/lib/env.ts` on the server-side to access these.
