# StrangerMingle Deployment Checklist

This document outlines the final steps required for the successful production launch of StrangerMingle.

## 1. Vercel Preparation
- [ ] **Environment Variables**: Add all variables from `docs/vercel-env-vars.md` to Vercel Project Settings.
- [ ] **Domain Setup**:
  - [ ] Connect `www.strangermingle.com`
  - [ ] Connect `members.strangermingle.com`
  - [ ] Connect `admin.strangermingle.com`
- [ ] **Cron Protection**: Ensure `CRON_SECRET` is set and matching in Vercel.

## 2. Supabase Production Setup
- [ ] **Project Creation**: Create a new production project in Supabase.
- [ ] **Database Schema**:
  - [ ] Run all migration files in order (or use `npx supabase db push`).
  - [ ] verify RLS is ENABLED for all 43 tables.
- [ ] **Storage Buckets**: Create the following public buckets:
  - `event-images`
  - `user-avatars`
  - `category-icons`
- [ ] **Edge Functions**: Deploy all functions in `supabase/functions/`.
- [ ] **Email Settings**: Configure "Site URL" and "Redirect URLs" in Auth Settings.

## 3. Integration Checks
- [ ] **Razorpay**:
  - [ ] Switch to **Live Mode**.
  - [ ] Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
  - [ ] Setup Webhook: `https://www.strangermingle.com/api/webhooks/razorpay` (Events: `payment.captured`, `refund.processed`).
- [ ] **Resend**:
  - [ ] Verify production domain in Resend dashboard.
  - [ ] Update `RESEND_API_KEY`.

## 4. Final Verification
- [ ] **Production Build**: Run `npm run build` locally to ensure no build errors.
- [ ] **SEO**: Verify `generateMetadata()` is working on dynamic routes (`/events/[slug]`).
- [ ] **Payments**: Perform a small test transaction in Live Mode (and refund it).
- [ ] **Analytics**: Check if `analytics_daily` snapshot cron is firing at midnight.

## 5. Security Audit
- [ ] Ensure `SUPABASE_SERVICE_ROLE_KEY` is NEVER used in `createBrowserClient`.
- [ ] Verify CSP headers in `next.config.ts` are working (no blocked Razorpay scripts).
- [ ] Check `vercel.json` headers for security compliance.

---
**Status**: Ready for Deployment Phase.
