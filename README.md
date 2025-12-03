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

%% ================
%% DEPLOYMENT NODES
%% ================

subgraph Browser["«node» Browser (User Device)"]
    ClientApp["«component» Next.js Client App\n- Renders pages/UI\n- Calls REST API\n- Loads images from CDN"]

    AccountPage["«component» AccountPage"]
    HelpPage["«component» HelpPage"]
    WrappedPage["«component» WrappedPage\nuses ActivityHeatmap"]
    ScrapbookDetailPage["«component» ScrapbookDetailPage"]
    UserContext["«component» UserContext (useUser)"]
    PostDetailModal["«component» PostDetailModal"]

    ClientApp --> AccountPage
    ClientApp --> HelpPage
    ClientApp --> WrappedPage
    ClientApp --> ScrapbookDetailPage
    ClientApp --> UserContext
    ClientApp --> PostDetailModal
end


subgraph FrontendHost["«node» Frontend Host (e.g., Vercel)"]
    ClientBuild["«artifact» Next.js Build Output"]
end


subgraph APIHost["«node» API Host (Node.js/Express)"]
    APIServer["«component» API Server\nProvides:\n- /api/users/*\n- /api/auth/*\n- /api/posts/*\n- /api/scrapbooks/*\nRequires:\n- DB Driver\n- UploadThing Webhooks"]
    ServerBuild["«artifact» Server Build"]
end


subgraph DBHost["«node» Database Host (MongoDB)"]
    Database["«component» Database\nCollections:\n- users\n- posts\n- scrapbooks\n- stats"]
end


subgraph CDNHost["«node» UploadThing CDN"]
    UploadThing["«component» UploadThing\nProvides public image URLs"]
end


%% ================
%% CONNECTORS
%% ================
Browser -->|HTTPS\nREST Requests\n(credentials: include)| APIServer
Browser -->|HTTPS\nGET image URLs| UploadThing
APIServer -->|CRUD Operations| Database

FrontendHost --> Browser
APIHost --> Browser
