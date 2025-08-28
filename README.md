# LiftLog - Gym Progress Tracker

A modern, responsive gym tracking application built with Next.js, TypeScript, and Firebase.

## Firebase setup

1. Create a Firebase project and enable Google Sign-In (Authentication → Sign-in method → Google → Enable).

2. Add a Web App in Firebase Console and copy the config values.

3. Create `.env.local` in the project root with:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Start dev server and sign in with Google from the header.

## Firebase Hosting (optional)

1. Install the CLI: `npm i -g firebase-tools`

2. Login and init hosting:

```
firebase login
firebase init hosting
# ? Use an existing project -> select your project
# ? What do you want to use as your public directory? .next (for Next.js SSR) or out (if using next export)
# If using Next.js app dir: choose "Configure as a single-page app" = No, and configure SSR with "firebase init hosting:github" if desired.
```

3. For simplest static export (no SSR), add to package.json scripts and run:

```
npm run build && npx next export -o out
firebase deploy --only hosting
```

4. For SSR on Firebase Hosting + Functions, follow Next.js + Firebase official guide and set `public` to `.next` with rewrites.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
