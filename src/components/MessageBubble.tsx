import { Bot, User, BookOpen } from "lucide-react";
import { Badge } from "react-bootstrap";

interface Source {
  doc: string;
  page: number;
}

export interface MessageProps {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
  sources?: Source[];
}



const MessageBubble = ({ role, content, time, sources }: MessageProps) => {
  return (
    <>
    <div className={`message-row ${role}`}>
      <div className="message-avatar">
        {role === "assistant" ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div className="message-content">
        <div className="message-bubble">{content}</div>

        {sources && sources.length > 0 && (
          <div className="message-sources">
            {sources.map((src, i) => (
              <Badge key={i} className="source-badge">
                <BookOpen size={10} />
                {src.doc} · p.{src.page}
              </Badge>
            ))}
          </div>
        )}

        <div className="message-time">{time}</div>
      </div>
    </div>
    </>
  )
}

export default MessageBubble