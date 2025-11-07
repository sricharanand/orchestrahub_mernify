import { useState } from "react";
import axios from "axios";

function UploadPiece() {
  const [title, setTitle] = useState("");
  const [composer, setComposer] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();
    formData.append("title", title);
    formData.append("composer", composer);
    formData.append("createdBy", user._id);
    for (let file of files) formData.append("files", file);

    try {
      await axios.post("http://localhost:5000/api/piece/create", formData);
      alert("Piece uploaded successfully!");
      window.location.href = "/admin";
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Upload New Piece</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Composer" value={composer} onChange={(e) => setComposer(e.target.value)} />
        <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadPiece;
