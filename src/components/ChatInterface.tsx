import { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, FileSearch, Sparkles, Zap, Bot } from "lucide-react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import MessageBubble from "./MessageBubble";
import type { Message } from "../pages/Home";
import { Download } from "lucide-react";
import jsPDF from "jspdf";

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  hasSelectedDoc: boolean;
  onSend: (question: string) => void;
}

const ChatInterface = ({ messages, isLoading, hasSelectedDoc, onSend }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const exportChat = () => {
    if (messages.length === 0) return;

    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.setTextColor(99, 102, 241);
    doc.text("DocuMind AI - Chat Export", 14, y);
    y += 10;

    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("Exported on " + new Date().toLocaleString(), 14, y);
    y += 8;

    doc.setDrawColor(99, 102, 241);
    doc.line(14, y, 196, y);
    y += 10;

    messages.forEach((msg) => {
      if (y > 265) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");

      if (msg.role === "user") {
        doc.setTextColor(99, 102, 241);
        doc.text("You:", 14, y);
      } else {
        doc.setTextColor(16, 185, 129);
        doc.text("AI Assistant:", 14, y);
      }

      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30);
      doc.setFontSize(10);

      const lines = doc.splitTextToSize(msg.content, 178);
      lines.forEach((line: string) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 14, y);
        y += 5;
      });

      y += 6;
    });

    doc.save("documind-chat-export.pdf");
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showWelcome = messages.length === 0;

  return (
    <Col className="chat-col">
      {showWelcome ? (
        <div className="chat-messages">
          <div className="welcome-screen">
            <div className="welcome-icon">
              <MessageSquare size={36} />
            </div>
            <h2 className="welcome-title">Ask anything about your documents</h2>
            <p className="welcome-desc">
              Upload documents and ask questions. The AI will find relevant
              information using RAG and provide accurate answers with source references.
            </p>
            <Row className="g-3 w-100" style={{ maxWidth: "600px" }}>
              <Col md={4}>
                <Card className="quick-action-card">
                  <div className="icon"><FileSearch size={22} /></div>
                  <div className="text">Summarize the key points of this document</div>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="quick-action-card">
                  <div className="icon"><Sparkles size={22} /></div>
                  <div className="text">What are the main findings and conclusions?</div>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="quick-action-card">
                  <div className="icon"><Zap size={22} /></div>
                  <div className="text">Compare concepts between uploaded docs</div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <div className="chat-messages">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} {...msg} />
          ))}
          {isLoading && (
            <div className="message-row assistant">
              <div className="message-avatar">
                <Bot size={18} />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

            {messages.length > 0 && (
        <div className="chat-export-bar">
          <button className="export-btn" onClick={exportChat}>
            <Download size={14} />
            Export Chat as PDF
          </button>
        </div>
      )}

      <div className="chat-input-area">
        <div className="chat-input-group">
          <Form.Control
            as="textarea"
            rows={1}
            className="chat-textarea"
            placeholder={
              hasSelectedDoc
                ? "Ask a question about this document..."
                : "Ask a question across all documents..."
            }
            value={input}
            onChange={autoResize}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            ref={textareaRef}
          />
          <Button
            className="send-btn"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send size={18} color="white" />
          </Button>
        </div>
        <div className="input-hint">
          Press <kbd>Enter</kbd> to send · <kbd>Shift + Enter</kbd> for new line
        </div>
      </div>
    </Col>
  );
};

export default ChatInterface;