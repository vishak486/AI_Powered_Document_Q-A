import { useState } from "react";
import { Bot, User, BookOpen, Copy, Check } from "lucide-react";
import { Badge } from "react-bootstrap";

interface Source {
  chunkIndex: number;
  score: number;
  preview: string;
}

export interface MessageProps {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
  sources?: Source[];
}

const MessageBubble = ({ role, content, time, sources }: MessageProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`message-row ${role}`}>
      <div className="message-avatar">
        {role === "assistant" ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div className="message-content">
        <div className="message-bubble">
          {content}
          {role === "assistant" && (
            <button
              className="copy-btn"
              onClick={handleCopy}
              title="Copy answer"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          )}
        </div>
        {sources && sources.length > 0 && (
          <div className="message-sources">
            {sources.map((src, i) => (
              <Badge key={i} className="source-badge">
                <BookOpen size={10} />
                Chunk {src.chunkIndex + 1} · {(src.score * 100).toFixed(0)}% match
              </Badge>
            ))}
          </div>
        )}
        <div className="message-time">{time}</div>
      </div>
    </div>
  );
};

export default MessageBubble;