import { Send, MessageSquare, FileSearch, Sparkles, Zap, Bot, } from "lucide-react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import MessageBubble from "./MessageBubble";
import type { MessageProps } from "./MessageBubble";

const mockMessages: MessageProps[] = [
    {
        id: 1,
        role: "user",
        content:
            "What are the key concepts of supervised learning explained in the document?",
        time: "2:14 PM",
    },
    {
        id: 2,
        role: "assistant",
        content: `Based on the document "Machine_Learning_Basics.pdf", supervised learning is a type of machine learning where the model is trained on labeled data. The key concepts include:

• Training Data — A dataset with known input-output pairs
• Feature Extraction — Identifying relevant attributes from raw data
• Model Training — Optimizing parameters to minimize prediction error
• Validation — Evaluating model performance on unseen data

The document emphasizes that choosing the right algorithm depends on the nature of the problem: classification for discrete outputs and regression for continuous values.`,
        time: "2:14 PM",
        sources: [
            { doc: "ML_Basics.pdf", page: 12 },
            { doc: "ML_Basics.pdf", page: 15 },
        ],
    },
    {
        id: 3,
        role: "user",
        content:
            "Can you compare supervised and unsupervised learning based on the document?",
        time: "2:16 PM",
    },
    {
        id: 4,
        role: "assistant",
        content: `According to the document, here are the main differences:

Supervised Learning uses labeled data and aims to predict outcomes. Common algorithms include Linear Regression, Decision Trees, and SVMs.

Unsupervised Learning works with unlabeled data and discovers hidden patterns. Common algorithms include K-Means Clustering, PCA, and Autoencoders.

The document notes that in practice, many real-world applications use a combination of both approaches, known as semi-supervised learning.`,
        time: "2:16 PM",
        sources: [
            { doc: "ML_Basics.pdf", page: 18 },
            { doc: "ML_Basics.pdf", page: 23 },
        ],
    },
];

const ChatInterface = () => {
    const showWelcome = false;
    return (
        <>
            <Col className="chat-col">
                {showWelcome ? (
                    <div className="chat-messages">
                        <div className="welcome-screen">
                            <div className="welcome-icon">
                                <MessageSquare size={36} />
                            </div>
                            <h2 className="welcome-title">
                                Ask anything about your documents
                            </h2>
                            <p className="welcome-desc">
                                Upload documents and ask questions. The AI will find relevant
                                information using RAG (Retrieval Augmented Generation) and provide
                                accurate answers with source references.
                            </p>

                            <Row className="g-3 w-100" style={{ maxWidth: "600px" }}>
                                <Col md={4}>
                                    <Card className="quick-action-card">
                                        <div className="icon">
                                            <FileSearch size={22} />
                                        </div>
                                        <div className="text">
                                            Summarize the key points of this document
                                        </div>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="quick-action-card">
                                        <div className="icon">
                                            <Sparkles size={22} />
                                        </div>
                                        <div className="text">
                                            What are the main findings and conclusions?
                                        </div>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="quick-action-card">
                                        <div className="icon">
                                            <Zap size={22} />
                                        </div>
                                        <div className="text">
                                            Compare concepts between uploaded docs
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : (
                    <div className="chat-messages">
                        {mockMessages.map((msg) => (
                            <MessageBubble key={msg.id} {...msg} />
                        ))}

                        {/* Typing indicator demo */}
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
                    </div>
                )}

                <div className="chat-input-area">
                    <div className="chat-input-group">
                        <Form.Control
                            as="textarea"
                            rows={1}
                            className="chat-textarea"
                            placeholder="Ask a question about your documents..."
                        />
                        <Button className="send-btn">
                            <Send size={18} color="white" />
                        </Button>
                    </div>
                    <div className="input-hint">
                        Press <kbd>Enter</kbd> to send · <kbd>Shift + Enter</kbd> for new line
                    </div>
                </div>
            </Col>
        </>
    )
}

export default ChatInterface