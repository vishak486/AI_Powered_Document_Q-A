import { useRef, useState } from "react";
import { Upload, Loader2, FileText } from "lucide-react";
import { Card } from "react-bootstrap";

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
  uploadStatus?: string | null;
}

const FileUpload = ({ onUpload, isUploading , uploadStatus  }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file.type === "application/pdf") {
      onUpload(file);
    } else {
      alert("Only PDF files are allowed");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
      e.target.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <Card
      className={`upload-card ${isDragging ? "dragging" : ""}`}
      onClick={() => !isUploading && inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div className="upload-icon">
        {isUploading ? (
          <Loader2 size={22} className="spin" />
        ) : isDragging ? (
          <FileText size={22} />
        ) : (
          <Upload size={22} />
        )}
      </div>
      <div className="upload-text">
        {isUploading ? (
          uploadStatus || "Processing..."
        ) : isDragging ? (
          <span className="upload-highlight">Drop your PDF here</span>
        ) : (
          <>
            <span className="upload-highlight">Click to upload</span> or drag & drop
          </>
        )}
      </div>
      <div className="upload-hint">PDF up to 10MB</div>
    </Card>
  );
};

export default FileUpload;