# BugHunt

Mobile-first bug reporting for multiple apps and websites.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS v4
- Supabase (database, auth and file storage)
- Vercel deployment

## Local development
1. Install Node.js 20.9+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add your Supabase project URL and anon key.
4. Run `npm run dev` and open http://localhost:3000.

The current dashboard uses sample data for its first visual iteration. The public report form is a UI prototype; connect the Supabase schema and submission API before production use.

## Deploy to Vercel
Import this repository in Vercel, select the Next.js framework preset, and add the environment variables from `.env.example`. Apply `supabase/schema.sql` to your Supabase project before enabling real report submissions.
