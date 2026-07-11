# Glenn — Portfolio Site

Personal portfolio and service hub. Built with Next.js 14 (App Router),
Tailwind CSS, and Framer Motion. The Contact form posts to `/api/contact`,
which saves the inquiry to Supabase and emails it to you via Resend.

## Setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` with your Supabase and Resend values (see below),
then run the dev server:

```bash
npm run dev
```

Visit http://localhost:3000.

## Connecting Supabase

1. Create a project at https://supabase.com (or reuse an existing one).
2. In the SQL editor, run:

```sql
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  project_type text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_submissions enable row level security;

create policy "Allow public inserts"
  on contact_submissions
  for insert
  to anon
  with check (true);
```

3. In your Supabase project settings, copy the Project URL and the
   `anon` public API key.
4. Add them to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The RLS policy above only allows inserts from the anon role — it does
not allow reading, updating, or deleting submissions from the client.
View submissions from the Supabase dashboard's Table Editor.

## Connecting Resend (email notifications)

1. Create an account at https://resend.com and grab an API key.
2. Add it to `.env.local`:

```
RESEND_API_KEY=re_your_key_here
```

3. By default, emails send from `onboarding@resend.dev` (Resend's shared
   test sender — works without domain verification) to
   `txglenn04@gmail.com`. To send from your own domain, verify it in
   Resend and update the `from` address in `app/api/contact/route.ts`.

## Other placeholders to update

- `components/Footer.tsx` — replace `[SURF SITE URL]` with your actual
  river surf lessons site URL.
- `components/Portfolio.tsx` — replace placeholder project cards with
  real client work, screenshots, and links once available.
- `public/headshot.jpg` — drop your headshot in at this exact path/name
  and the About section will automatically use it instead of the
  gradient placeholder (see `public/README.txt`).

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to https://vercel.com/new and import the repo.
3. Add the environment variables from `.env.example` in the Vercel
   project settings (Settings → Environment Variables).
4. Deploy. Vercel will auto-detect Next.js and build correctly.

Subsequent pushes to your main branch will auto-deploy.
