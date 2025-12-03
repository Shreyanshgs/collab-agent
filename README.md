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
graph TD
    %% ------------------- STYLING -------------------
    classDef deploymentNode fill:#eeeeee,stroke:#333,stroke-width:2px;
    classDef component fill:#ffffff,stroke:#2b6cb0,stroke-width:2px;
    classDef subComponent fill:#ebf8ff,stroke:#4299e1,stroke-width:1px,stroke-dasharray: 0;
    classDef database fill:#ffffff,stroke:#2b6cb0,stroke-width:2px,shape:cylinder;
    classDef userNode fill:#ffffff,stroke:#000,stroke-width:2px;

    %% ------------------- NODES & COMPONENTS -------------------
    
    %% FIX: Changed from 'actor' to a circle node
    User(("Browser User")):::userNode

    %% NODE: FRONTEND / BROWSER
    subgraph BrowserNode ["«node» Browser / Frontend Host (Vercel)"]
        direction TB
        
        subgraph NextClient ["«component» Next.js App (Client)"]
            direction TB
            
            %% Sub-components
            UserContext["«component» UserContext"]
            AccountPage["«component» AccountPage"]
            HelpPage["«component» HelpPage"]
            
            subgraph WrappedContext ["Wrapped Feature"]
                WrappedPage["«component» WrappedPage"]
                Heatmap["«component» ActivityHeatmap"]
                WrappedPage --> Heatmap
            end
            
            subgraph SBContext ["Scrapbook Feature"]
                SBDetail["«component» ScrapbookDetailPage"]
            end
            
            PostModal["«component» PostDetailModal"]
            
            %% Internal Links for context
            SBDetail -.-> PostModal
        end
    end

    %% NODE: API HOST
    subgraph APIHostNode ["«node» API Host (Node/Express)"]
        APIServer["«component» API Server<br/>(REST Endpoints: Users, Posts, Scrapbooks, Auth)"]
    end

    %% NODE: DATABASE HOST
    subgraph DBHostNode ["«node» DB Host (Mongo/Postgres)"]
        Database[("«component» Database")]
    end

    %% NODE: CDN
    subgraph CDNHostNode ["«node» CDN (UploadThing)"]
        CDN["«component» UploadThing Service"]
    end

    %% ------------------- RELATIONSHIPS -------------------

    %% User to UI
    User -->|"Provides UI Events"| NextClient

    %% Client to API (HTTPS)
    NextClient -- "HTTPS (credentials: include)<br/>REST: /api/users, /api/scrapbooks" --> APIServer

    %% Client to CDN (Assets)
    NextClient -.-> |"GET Image Assets (URL)"| CDN

    %% API to Database
    APIServer -- "Data Persistence (CRUD)<br/>DB Driver" --> Database

    %% API to CDN (Webhooks/Mgmt)
    APIServer -.-> |"Webhooks/Mgmt"| CDN

    %% ------------------- APPLY STYLES -------------------
    class BrowserNode,APIHostNode,DBHostNode,CDNHostNode deploymentNode;
    class NextClient,APIServer,CDN component;
    class Database database;
    class UserContext,AccountPage,HelpPage,WrappedPage,Heatmap,SBDetail,PostModal subComponent;
