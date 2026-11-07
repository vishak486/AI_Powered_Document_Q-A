import { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, FileSearch, Sparkles, Zap, Bot } from "lucide-react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import MessageBubble from "./MessageBubble";
import type { Message } from "../pages/Home";

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  hasSelectedDoc: boolean;
  onSend: (question: string) => void;
}

const ChatInterface = ({ messages, isLoading, hasSelectedDoc, onSend }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading ) return;
    onSend(input.trim());
    setInput("");
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
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
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