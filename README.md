# CollabAgent

**CollabAgent** is an AI-powered meeting assistant that lets users record or upload audio files and receive real-time transcriptions and concise summaries powered by OpenAI Whisper and Gemini.

## Features

- Record audio directly in-browser or upload `.wav` files
- Real-time transcription using Whisper
- Automatic summary generation with Google Gemini (Gemini 2.0 Flash)
- Full-stack app with Next.js frontend and FastAPI backend

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** FastAPI, Python, OpenAI Whisper
- **AI Model:** Google Generative AI (Gemini)
- **Other:** Web Audio API, FormData, REST


```mermaid
flowchart LR
  subgraph Client["Web Client (Next.js)"]
    C[UI Pages & Client Components\nclient/app/*]
  end

  subgraph API["API Layer (Next.js API routes / backend)"]
    A[Posts API]\n
    B[Scrapbooks API]\n
    D[Wrapped API]\n
    E[Account API]\n
    F[Auth API]
  end

  subgraph Auth["Auth Service (NextAuth/OIDC/JWT)"]
    AUTH[Auth Provider]
  end

  subgraph Data["Database"]
    DB[(Users, Posts, Photos, Tags, Scrapbooks, Stats)]
  end

  subgraph Storage["Media Storage (S3/Cloud)"]
    S3[(Image Objects)]
  end

  CDN[CDN / Public URLs]
  Worker["Wrapped Stats Worker (optional)"]

  C -->|REST / fetch| A
  C -->|REST / fetch| B
  C -->|REST / fetch| D
  C -->|REST / fetch| E
  C -->|REST / fetch| F

  A -->|SQL/ORM| DB
  B -->|SQL/ORM| DB
  D -->|SQL/ORM| DB
  E -->|SQL/ORM| DB

  A -->|Object Storage SDK| S3
  B -->|Object Storage SDK| S3

  S3 --> CDN
  C -->|CDN URLs| CDN

  API -->|OIDC/JWT| AUTH
  Worker -->|SQL/ORM| DB
  Worker -. optional stats gen .-> D
