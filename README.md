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
flowchart TB

%% Deployment Nodes
subgraph Browser["«node» Browser (User Device)"]
    ClientApp["«component» Next.js Client App"]
    AccountPage["«component» AccountPage"]
    HelpPage["«component» HelpPage"]
    WrappedPage["«component» WrappedPage"]
    ScrapbookDetailPage["«component» ScrapbookDetailPage"]
    UserContext["«component» UserContext"]
    PostDetailModal["«component» PostDetailModal"]

    ClientApp --> AccountPage
    ClientApp --> HelpPage
    ClientApp --> WrappedPage
    ClientApp --> ScrapbookDetailPage
    ClientApp --> UserContext
    ClientApp --> PostDetailModal
end

subgraph FrontendHost["«node» Frontend Host (Vercel)"]
    ClientBuild["«artifact» Next.js Build Output"]
end

subgraph APIHost["«node» API Host (Express Server)"]
    APIServer["«component» API Server"]
    ServerBuild["«artifact» Server Build"]
end

subgraph DBHost["«node» Database Host (MongoDB)"]
    Database["«component» Database"]
end

subgraph CDNHost["«node» UploadThing CDN"]
    UploadThing["«component» UploadThing"]
end

%% Connectors
Browser -->|HTTPS Request| APIServer
Browser -->|Image Request| UploadThing
APIServer -->|Database CRUD| Database

FrontendHost --> Browser
APIHost --> Browser
