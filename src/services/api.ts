const API_BASE = "http://localhost:3000";

export interface DocumentItem {
  _id: string;
  filename: string;
  originalName: string;
  fileSize: number;
  totalChunks: number;
  status: "processing" | "ready" | "failed";
  uploadedAt: string;
}

export interface Source {
  chunkIndex: number;
  score: number;
  preview: string;
}

export interface ChatResponse {
  answer: string;
  sources: Source[];
}

export interface ChatHistoryItem {
  _id: string;
  question: string;
  answer: string;
  sources: Source[];
  createdAt: string;
}


export async function fetchDocuments(): Promise<DocumentItem[]> {
  const res = await fetch(`${API_BASE}/api/documents`);
  const data = await res.json();
  return data.documents;
}

export async function uploadDocument(file: File): Promise<DocumentItem> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/documents/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.document;
}

export async function deleteDocument(id: string): Promise<void> {
  await fetch(`${API_BASE}/api/documents/${id}`, { method: "DELETE" });
}

export async function askQuestion(
  documentId: string | null,
  question: string
): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/documents/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ documentId, question }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function fetchChatHistory(documentId: string): Promise<ChatHistoryItem[]> {
  const res = await fetch(`${API_BASE}/api/documents/${documentId}/chat-history`);
  const data = await res.json();
  return data.history;
}
