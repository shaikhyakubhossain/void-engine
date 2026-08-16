# Void Engine AI

Void Engine AI is a full-stack AI chat application with a Next.js frontend and an Express + TypeScript backend. The project is designed around a streaming chat experience, conversation history, user authentication, and multi-provider LLM integration.

## Overview

The app combines:

- A modern chat UI in Next.js
- Server-side LLM orchestration in Express
- Streaming responses from AI providers
- MongoDB-backed persistence for users and conversations
- Model and provider switching for multiple AI backends
- Authentication with JWT-based protected routes

## Tech stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Sass styling
- Markdown rendering with syntax highlighting
- Local conversation management and state-driven chat experience

### Backend
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT auth
- Google Gemini and OpenRouter integrations
- Zod-based validation patterns and structured API responses

## Main features

- AI chat interface with streaming text responses
- Conversation creation, listing, retrieval, update, and deletion
- User registration and login
- Protected API routes for authenticated users
- Provider and model selection in the chat flow
- Message history used for conversation continuity
- Browser notification support for completed responses
- Markdown rendering and code block styling for AI output

## Project structure

```text
voidcore/
├── BE/                    # Express API and AI integration layer
│   ├── src/
│   │   ├── config/        # env, CORS, DB, LLM config
│   │   ├── controllers/   # auth, chat, llm, conversation handlers
│   │   ├── middleware/    # auth middleware
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # REST routes
│   │   ├── services/      # business logic and LLM providers
│   │   └── utils/         # JWT/password helpers
│   └── package.json
├── FE/                    # Next.js frontend app
│   ├── app/               # App Router pages and API handlers
│   ├── components/        # Chat, sidebar, markdown, UI blocks
│   ├── context/           # Chat and toast state
│   ├── hooks/             # custom hooks
│   ├── services/          # API and state services
│   └── package.json
├── README.md
├── LICENSE
└── package.json (if present in repo root)
```

## Environment variables

### Backend (BE/.env)

Create a `.env` file inside the `BE` folder:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_super_secret_jwt_key
MONGODB_URI=mongodb://localhost:27017/voidcore
GEMINI_API_KEY=your_gemini_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
MONGODB_DNS_SERVER=optional_dns_server_for_mongo
```

Notes:
- `CLIENT_URL` is required for the backend CORS configuration.
- `GEMINI_API_KEY` is used for Gemini-powered chat responses.
- `OPENROUTER_API_KEY` enables the OpenRouter provider integration.
- `JWT_SECRET` is required for authenticated endpoints.

### Frontend (FE/.env or FE/.env.local)

```env
BACKEND_API_URL=http://localhost:5000
```

## Getting started

### 1) Install dependencies

```bash
cd FE && npm install
cd ../BE && npm install
```

### 2) Start the backend

```bash
cd BE
npm run dev
```

The backend listens on the configured `PORT` and exposes a health check at:

```text
http://localhost:5000/health
```

### 3) Start the frontend

In a separate terminal:

```bash
cd FE
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Available scripts

### Frontend

```bash
cd FE
npm run dev
npm run build
npm run lint
npm run plop
```

### Backend

```bash
cd BE
npm run dev
npm run build
npm run start
```

## API overview

The backend exposes routes under the main API surface:

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Chat
- `POST /api/chat` or chat streaming routes defined in the app layer

### LLM metadata
- `GET /api/llm/providers`
- `GET /api/llm/models`

### Conversations
- `GET /api/conversations`
- `GET /api/conversations/:id`
- `POST /api/conversations`
- `PATCH /api/conversations/:id`
- `DELETE /api/conversations/:id`

## Notes

This project is actively evolving. Some parts of the frontend and backend are structured for future expansion, while the current app already supports a working chat flow, persistent conversation management, and multiple model/provider integrations.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
