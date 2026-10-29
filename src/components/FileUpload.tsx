import { Upload } from "lucide-react";
import { Card } from "react-bootstrap";

const FileUpload = () => {
    return (
        <>
            <Card className="upload-card">
                <div className="upload-icon">
                    <Upload size={22} />
                </div>
                <div className="upload-text">
                    <span className="upload-highlight">Click to upload</span> or drag & drop
                </div>
                <div className="upload-hint">PDF, TXT, DOCX up to 10MB</div>
            </Card>
        </>
    )
}

export default FileUpload