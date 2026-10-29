import { useState } from "react";
import { Brain, FileText, Database, Menu, X } from "lucide-react";
import { Navbar, Container, Row, Col, Badge, Button } from "react-bootstrap";
import FileUpload from "../components/FileUpload";
import DocumentList from "../components/DocumentList";
import ChatInterface from "../components/ChatInterface";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-container">
      {/* ===== Header / Navbar ===== */}
      <Navbar className="custom-navbar" expand="lg">
        <Container fluid className="d-flex justify-content-between align-items-center">
          {/* Left side: Toggle + Brand */}
          <div className="d-flex align-items-center gap-3">
            <Button
              className="mobile-toggle"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </Button>

            <div className="d-flex align-items-center gap-3">
              <div className="brand-logo">
                <Brain size={24} color="white" />
              </div>
              <div>
                <h1 className="brand-title">DocuMind AI</h1>
                <div className="brand-subtitle">
                  RAG-Powered Document Intelligence
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Stats */}
          <div className="d-flex gap-3 header-stats">
            <div className="stat-pill">
              <FileText size={16} />
              <div>
                <div className="stat-value">4</div>
                <div className="stat-label">Documents</div>
              </div>
            </div>
            <div className="stat-pill">
              <Database size={16} />
              <div>
                <div className="stat-value">1,247</div>
                <div className="stat-label">Chunks</div>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>

      {/* ===== Sidebar Overlay (mobile only) ===== */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={closeSidebar}
      />

      {/* ===== Body ===== */}
      <div className="app-body">
        <Row>
          {/* Sidebar */}
          <Col md={3} className={`sidebar-col ${sidebarOpen ? "mobile-open" : ""}`}>
            {/* Upload section */}
            <div className="sidebar-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="section-title">Upload Documents</h6>
                <Button
                  className="sidebar-close-btn"
                  onClick={closeSidebar}
                  aria-label="Close sidebar"
                >
                  <X size={20} />
                </Button>
              </div>
              <FileUpload />
            </div>

            {/* Document list */}
            <div className="sidebar-section docs-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="section-title">Your Documents</h6>
                <Badge className="section-badge" pill>
                  4
                </Badge>
              </div>
              <DocumentList />
            </div>
          </Col>

          {/* Chat Area */}
          <ChatInterface />
        </Row>
      </div>
    </div>
  );
};

export default Home;