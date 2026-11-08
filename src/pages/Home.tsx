import { useState, useEffect} from "react";
import toast from "react-hot-toast";
import { Brain, FileText, Database, Menu, X } from "lucide-react";
import { Navbar, Container, Row, Col, Badge, Button } from "react-bootstrap";
import FileUpload from "../components/FileUpload";
import DocumentList from "../components/DocumentList";
import ChatInterface from "../components/ChatInterface";
import {
  fetchDocuments,
  uploadDocument,
  deleteDocument,
  askQuestion,
  fetchChatHistory ,
  type DocumentItem,
} from "../services/api";

export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
  sources?: { chunkIndex: number; score: number; preview: string }[];
}

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

   const loadDocuments = async () => {
    try {
      const docs = await fetchDocuments();
      setDocuments(docs);
    } catch {
      console.error("Failed to load documents");
    }
  };

  useEffect(() => {
    let cancelled = false;
    fetchDocuments().then((docs) => {
      if (!cancelled) setDocuments(docs);
    }).catch(() => {
      console.error("Failed to load documents");
    });
    return () => { cancelled = true; };
  }, []);

  const handleUpload = async (file: File) => {
    setUploadStatus("Uploading...");
    try {
      setUploadStatus("Extracting text & generating embeddings...");
      await uploadDocument(file);
      await loadDocuments();
      toast.success("Document uploaded and processed");
    } catch (err) {
        toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadStatus(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDocument(id);
    if (selectedDocId === id) {
      setSelectedDocId(null);
      setMessages([]);
    }
    await loadDocuments();
    toast.success("Document deleted");
  };

    const handleSelectDoc = async (id: string) => {
    setSelectedDocId(id);
    setSidebarOpen(false);
    try {
      const history = await fetchChatHistory(id);

      const allMessages: Message[] = [];
      history.forEach((item, index) => {
        const time = new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        allMessages.push({
          id: index * 2,
          role: "user",
          content: item.question,
          time,
        });
        allMessages.push({
          id: index * 2 + 1,
          role: "assistant",
          content: item.answer,
          time,
          sources: item.sources,
        });
      });

      setMessages(allMessages);
    } catch {
      setMessages([]);
    }
  };

  const handleSend = async (question: string) => {
    if (!question.trim()) return;

    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: question,
      time: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const data = await askQuestion(selectedDocId, question);
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.answer,
        time: now,
        sources: data.sources,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Sorry, I couldn't process your question. Please try again.",
        time: now,
      };
      setMessages((prev) => [...prev, errorMsg]);
       toast.error("Failed to get answer. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalChunks = documents.reduce((sum, d) => sum + d.totalChunks, 0);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-container">
      <Navbar className="custom-navbar" expand="lg">
        <Container fluid className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <Button className="mobile-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
              <Menu size={20} />
            </Button>
            <div className="d-flex align-items-center gap-3">
              <div className="brand-logo">
                <Brain size={24} color="white" />
              </div>
              <div>
                <h1 className="brand-title">DocuMind AI</h1>
                <div className="brand-subtitle">RAG-Powered Document Intelligence</div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-3 header-stats">
            <div className="stat-pill">
              <FileText size={16} />
              <div>
                <div className="stat-value">{documents.length}</div>
                <div className="stat-label">Documents</div>
              </div>
            </div>
            <div className="stat-pill">
              <Database size={16} />
              <div>
                <div className="stat-value">{totalChunks}</div>
                <div className="stat-label">Chunks</div>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>

      <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={closeSidebar} />

      <div className="app-body">
        <Row>
          <Col md={3} className={`sidebar-col ${sidebarOpen ? "mobile-open" : ""}`}>
            <div className="sidebar-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="section-title">Upload Documents</h6>
                <Button className="sidebar-close-btn" onClick={closeSidebar} aria-label="Close sidebar">
                  <X size={20} />
                </Button>
              </div>
                <FileUpload onUpload={handleUpload} isUploading={!!uploadStatus} uploadStatus={uploadStatus} />
            </div>
            <div className="sidebar-section docs-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="section-title">Your Documents</h6>
                <Badge className="section-badge" pill>{documents.length}</Badge>
              </div>
              {documents.length > 0 && (
                <div className="doc-search-wrapper">
                  <input
                    type="text"
                    className="doc-search-input"
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
              <DocumentList
                documents={documents.filter(d =>
                  d.originalName.toLowerCase().includes(searchQuery.toLowerCase())
                )}
                selectedDocId={selectedDocId}
                onSelect={handleSelectDoc}
                onDelete={handleDelete}
              />
            </div>
          </Col>
          <ChatInterface
            messages={messages}
            isLoading={isLoading}
            hasSelectedDoc={!!selectedDocId}
            onSend={handleSend}
          />
        </Row>
      </div>
    </div>
  );
};

export default Home;