# Mindora — Client

Mindora is an AI companion for talking through what's on your mind. You open the chat and type how you're feeling, and Mindora replies in a calm, supportive way. Messages that suggest self-harm get an immediate pointer to real-world help instead of an AI reply.

> Mindora is an AI companion, not a substitute for professional care.

**Live:** https://mindora-client-two.vercel.app
**Backend:** [Mindora-server](https://github.com/MojolaoluwaGafar/Mindora-server)

## Features

- **Streaming replies.** Text appears as it's generated, and replies render as markdown (lists, bold, links).
- **Anonymous chat.** A random session ID is stored in `localStorage` and sent as the `x-session-id` header, so there's no sign-up.
- **Conversation restore.** A refreshed page reloads the conversation, which the server keeps for 1 hour. "End Chat" deletes it from the server immediately.
- **Safety UI.** Crisis messages show a helpline card (emergency numbers, 988, Samaritans, findahelpline.com). Concerning messages show a link to `/resources`.
- **Cold-start handling.** The homepage pings the server so it starts waking up early. If a reply takes more than 8 seconds, the chat shows a "waking up" note.
- **Pages:** Home, Chat (`/talkToMindora`), Resources (`/resources`) and Privacy (`/privacy`).
- **Responsive, accessible layout.** The chat fills the screen, and the page has screen-reader labels, live regions and alt text.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · react-markdown · Axios · Lucide icons. Deployed on Vercel, with CI on GitHub Actions (lint + build).

## Getting started

```bash
npm install
cp .env.example .env   # or create .env by hand, see below
npm run dev            # http://localhost:5173
```

### Environment variables

| Variable        | Description                              | Example                                |
| --------------- | ---------------------------------------- | -------------------------------------- |
| `VITE_BASE_URL` | Base URL of the Mindora backend          | `http://localhost:5000` or `https://mindora-server.onrender.com` |

## Scripts

| Command           | What it does                    |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start the dev server            |
| `npm run build`   | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build      |
| `npm run lint`    | Run ESLint                      |

## Project structure

```
src/
  API/          API client: streaming chat, history, end session, warm-up
  Hook/useChat  Chat state, streaming, history restore
  Pages/        HomePage, ChatPage, ResourcesPage, PrivacyPage, Error404
  Components/   Landing-page sections, AIMessage (markdown), CrisisResources
```

## Deployment

The app is deployed on Vercel. `vercel.json` rewrites every route to `index.html`, so client-side routes like `/talkToMindora` work on refresh. Set `VITE_BASE_URL` in the Vercel project settings.

Note: the backend runs on Render's free tier, so the first message after a quiet period can take up to a minute while the server wakes up.
