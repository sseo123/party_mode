# Snap Clone — Starter Project

A minimal Snapchat-look-alike starter for teaching fullstack mobile dev.
It ships with exactly two things working end-to-end:

1. A Snapchat-styled **login/sign-up screen** (Supabase Auth, email + password)
2. A **full-screen camera** that opens right after login (Expo Camera —
   capture photo, flip camera, toggle flash, preview + retake)

Everything else — Stories, chat, friends, disappearing snaps, sending a
snap to someone — is left as an exercise. There's a `TODO (students)` comment
in `src/screens/CameraScreen.tsx` and `src/lib/supabase.ts` marking the two
places you'll extend first.

## Tech stack
- Expo **SDK 54** (pinned — required for this to work in current Expo Go)
- React Native 0.81 / React 19
- TypeScript
- Supabase (`@supabase/supabase-js`) for auth + database
- `expo-camera` for the camera
- `@react-navigation/native` + `native-stack` are pre-installed (not wired up
  yet) — you'll want these once you add more screens (chat, stories, profile)

## 1. Set up Supabase

1. Create a free project at https://supabase.com
2. In your project, go to **Settings → API** and copy the **Project URL**
   and the **anon/public key**
3. Open `src/lib/supabase.ts` and paste them in:

```ts
const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";
```

4. In Supabase, go to **Authentication → Providers** and make sure
   **Email** is enabled. For classroom use, under **Authentication →
   Settings** you may want to turn **off** "Confirm email" so students can
   sign up and log straight in without checking an inbox.

## 2. Install & run

```bash
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app (SDK 54 build) on your phone.
Camera access requires a physical device or a simulator with camera
support — it will not work in the web preview.

## 3. Project structure

```
App.tsx                    -- auth listener: shows LoginScreen or CameraScreen
src/lib/supabase.ts         -- Supabase client (put your keys here)
src/screens/LoginScreen.tsx  -- Snapchat-styled auth screen
src/screens/CameraScreen.tsx -- full-screen camera + capture/preview
```

## 4. Suggested feature build order (for students)

1. **Friends system** — a `profiles` table (id, username, avatar) synced
   from `auth.users`, plus a `friendships` table with pending/accepted
   status.
2. **Send a snap** — Supabase Storage bucket for photos + a `snaps` table
   (sender_id, recipient_id, image_path, created_at, viewed_at).
3. **Disappearing snaps** — mark `viewed_at` on open, hide/delete after
   viewing, add a Postgres cron or Edge Function to purge old rows.
4. **Stories** — same idea as snaps but `visible_to = all friends` and a
   24-hour expiry.
5. **Chat** — a `messages` table + Supabase Realtime subscriptions for
   live updates.

## Note on look & feel

The login screen matches Snapchat's general layout (yellow background,
centered mascot mark, username/password fields, black bottom bar) for
teaching purposes. The ghost mark is a generic placeholder shape, not
Snapchat's actual logo/trademark — swap in your own branding before
shipping anything publicly.
