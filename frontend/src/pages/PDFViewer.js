import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function PDFViewer() {
  const { filePath } = useParams();
  const navigate = useNavigate();

  const decodedPath = decodeURIComponent(filePath);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>
        ← Back
      </button>

      <h2>Score Viewer</h2>
      <p style={{ color: "#666" }}>
        You can draw annotations directly on the PDF and download it using the built-in toolbar.
      </p>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          overflow: "hidden",
          width: "90%",
          height: "80vh",
        }}
      >
        <iframe
          src={`http://localhost:5000/${decodedPath}`}
          title="Score Viewer"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
}

export default PDFViewer;
