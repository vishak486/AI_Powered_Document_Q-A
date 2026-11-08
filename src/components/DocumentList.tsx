import { FileText, Trash2 } from "lucide-react";
import type { DocumentItem } from "../services/api";

interface DocumentListProps {
  documents: DocumentItem[];
  selectedDocId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return mins + " min ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  return Math.floor(hrs / 24) + "d ago";
}

const DocumentList = ({
  documents,
  selectedDocId,
  onSelect,
  onDelete,
}: DocumentListProps) => {
  if (documents.length === 0) {
    return (
      <div className="doc-list-wrapper" style={{ justifyContent: "center", alignItems: "center" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", textAlign: "center" }}>
          No documents yet. Upload a PDF to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="doc-list-wrapper">
      {documents.map((doc) => (
        <div
          key={doc._id}
          className={`doc-item ${selectedDocId === doc._id ? "active" : ""}`}
          onClick={() => onSelect(doc._id)}
        >
          <div className="doc-icon pdf">
            <FileText size={18} />
          </div>
          <div className="doc-info">
            <p className="doc-name">{doc.originalName}</p>
            <div className="doc-meta">
              {formatSize(doc.fileSize)} · {timeAgo(doc.uploadedAt)} · {doc.totalChunks} chunks
            </div>
          </div>
          <div className={`doc-status ${doc.status}`} />
          <button
            className="btn p-1"
            style={{ color: "var(--text-muted)", background: "none", border: "none" }}
            onClick={(e) => {
              e.stopPropagation();
             if (window.confirm(`Delete "${doc.originalName}"? This cannot be undone.`)) {
                onDelete(doc._id);
              }
            }}
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;