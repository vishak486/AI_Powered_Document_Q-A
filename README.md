# DocuMind AI – Frontend

React + TypeScript web app for **DocuMind AI**, a RAG-powered document Q&A tool. Upload PDF documents, then ask questions and get answers based on their content, with source references for every answer.

**Backend repository:** [AI_Powered_Document_Q-A_Backend](https://github.com/vishak486/AI_Powered_Document_Q-A_Backend)

**Live demo:** _add your Vercel URL here_

## Features

- Upload PDFs by clicking or drag and drop (up to 10 MB)
- Live processing status while a document is being embedded
- Document list with search, file size, upload time and chunk count
- Delete documents with a confirmation prompt
- Ask questions about one selected document, or across all documents
- Answers show source badges (chunk number and match percentage)
- Chat history is loaded automatically when you select a document
- Copy any answer with one click
- Export a conversation as a PDF
- Responsive layout with a slide-in sidebar on mobile
- Toast notifications for success and error states

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | React 19 with TypeScript |
| Build tool | Vite |
| UI | Bootstrap 5, React-Bootstrap, custom CSS |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| PDF export | jsPDF |
| Quality | ESLint, TypeScript type check, Vitest |
| CI/CD | GitHub Actions, Vercel |

## Project Structure

```
├── index.html
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx               # App entry, toast provider
│   ├── App.tsx
│   ├── App.css                # Theme and layout styles
│   ├── pages/
│   │   └── Home.tsx           # Main page: state and layout
│   ├── components/
│   │   ├── FileUpload.tsx     # Drag and drop PDF upload
│   │   ├── DocumentList.tsx   # Document list and delete
│   │   ├── ChatInterface.tsx  # Chat view, input, PDF export
│   │   └── MessageBubble.tsx  # Message, sources, copy button
│   └── services/
│       └── api.ts             # Backend API calls and types
└── .github/workflows/ci.yml
```

## Getting Started

### Prerequisites

- Node.js 22 or later
- The backend running locally, or the deployed backend URL

### Installation

```bash
git clone https://github.com/vishak486/AI_Powered_Document_Q-A.git
cd AI_Powered_Document_Q-A
npm install
```

### Configure the API URL

The backend address is set in `src/services/api.ts`:

```ts
const API_BASE = "https://documindaiserver.runasp.net";
```

To use a backend running on your own machine, change it to `http://localhost:3000`, and change it back before you push.

### Run

```bash
npm run dev         # start the dev server
npm run build       # type check and build for production
npm run preview     # preview the production build
npm run lint        # run ESLint
npm run typecheck   # run the TypeScript check
npm test            # run Vitest
```

## How It Works

1. Select or upload a PDF. The backend extracts the text, splits it into chunks, and stores vector embeddings in MongoDB Atlas.
2. When you pick a document, its saved chat history loads into the chat.
3. Your question goes to the backend, which finds the most relevant chunks and asks Gemini to answer from them.
4. The answer appears with source badges showing which chunks were used.

With no document selected, questions are searched across all uploaded documents.

## Continuous Integration and Deployment

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push to `master` and on pull requests:

1. Install dependencies with `npm ci`
2. Lint, type check and test
3. Build the app and upload the `dist/` folder as an artifact
4. On `master` only, trigger a Vercel deployment through a deploy hook

The deploy hook URL is stored as the `VERCEL_DEPLOY_HOOK` repository secret and is not part of the code.

## Author

**Vishak Vijayan** – [GitHub](https://github.com/vishak486)
