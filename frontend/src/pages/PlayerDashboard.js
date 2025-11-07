import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PlayerDashboard() {
  const [pieces, setPieces] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?._id) return;
    axios.get(`http://localhost:5000/api/piece/my/${user._id}`)
      .then(res => setPieces(res.data))
      .catch(console.error);
  }, [user?._id]);

  const handleUpload = async (e, pieceId) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("userId", user._id);

      await axios.post(
        `http://localhost:5000/api/piece/upload-annotation/${pieceId}`,
        formData
      );

      alert("Annotated version uploaded!");
      window.location.href = "/player";
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };


  return (
    <div style={{ padding: 30 }}>
      <h2>My Assigned Pieces</h2>
      {pieces.map(p => (
        <div key={p._id} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
          <h3>{p.title}</h3>
          <p>Composer: {p.composer}</p>
          {p.files
            .filter(f => f.assignedTo.includes(user._id))
            .map(f => {
              const annotatedPath = f.annotatedPaths?.[user._id];

              return (
                <div key={f._id}>
                  <a
                    href={`http://localhost:5000/${f.filePath}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View PDF
                  </a>{" "}
                  ||{" "}
                  <Link
                    to={`/viewer/${encodeURIComponent(annotatedPath || f.filePath)}`}
                  >
                    {annotatedPath ? "Open My Annotated Version" : "Open Original"}
                  </Link>

                  <div style={{ marginTop: 5 }}>
                    <label style={{ fontSize: 14, color: "#666" }}>
                      Upload annotated PDF:{" "}
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleUpload(e, p._id)}
                      />
                    </label>
                  </div>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}

export default PlayerDashboard;
