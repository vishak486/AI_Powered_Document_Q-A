import { FileText, File, FileType } from "lucide-react";

interface Document {
  id: number;
  name: string;
  type: "pdf" | "txt" | "doc";
  size: string;
  date: string;
  status: "ready" | "processing";
  active?: boolean;
}

const documents: Document[] = [
  {
    id: 1,
    name: "Machine_Learning_Basics.pdf",
    type: "pdf",
    size: "2.4 MB",
    date: "2 hours ago",
    status: "ready",
    active: true,
  },
  {
    id: 2,
    name: "Project_Requirements.docx",
    type: "doc",
    size: "856 KB",
    date: "5 hours ago",
    status: "ready",
  },
  {
    id: 3,
    name: "Research_Notes.txt",
    type: "txt",
    size: "124 KB",
    date: "1 day ago",
    status: "ready",
  },
  {
    id: 4,
    name: "API_Documentation.pdf",
    type: "pdf",
    size: "5.1 MB",
    date: "Just now",
    status: "processing",
  },
];

const iconMap = {
  pdf: FileText,
  txt: File,
  doc: FileType,
};

const DocumentList = () => {
  return (
    <div className="doc-list-wrapper">
      {documents.map((doc) => {
        const Icon = iconMap[doc.type];
        return (
          <div
            key={doc.id}
            className={`doc-item ${doc.active ? "active" : ""}`}
          >
            <div className={`doc-icon ${doc.type}`}>
              <Icon size={18} />
            </div>
            <div className="doc-info">
              <p className="doc-name">{doc.name}</p>
              <div className="doc-meta">
                {doc.size} · {doc.date}
              </div>
            </div>
            <div className={`doc-status ${doc.status}`} />
          </div>
        );
      })}
    </div>
  );
};

export default DocumentList;