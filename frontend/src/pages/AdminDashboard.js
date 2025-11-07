import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/piece")
      .then(res => setPieces(res.data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>WELCOME</h1>
      <h2>All Pieces</h2>
      {pieces.map(p => (
        <div key={p._id} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
          <h3>{p.title}</h3>
          <p>Composer: {p.composer}</p>
          <p>Files:</p>
          <ul>
            {p.files.map(f => (
              <li key={f._id} style={{ marginBottom: 8 }}>
                <div>
                  {f.instrument} –{" "}
                  <a href={`http://localhost:5000/${f.filePath}`} target="_blank" rel="noreferrer">
                    View PDF
                  </a>
                </div>
                <AssignForm pieceId={p._id} instrument={f.instrument} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}


function AssignForm({ pieceId, instrument }) {
  const [emails, setEmails] = useState("");

  const assignUsers = async () => {
    try {
      const resUsers = await axios.get("http://localhost:5000/api/auth/users");
      const selectedIds = resUsers.data
        .filter(u => emails.split(",").map(e => e.trim()).includes(u.email))
        .map(u => u._id);

      if (selectedIds.length === 0) return alert("No valid users found.");

      await axios.post(`http://localhost:5000/api/piece/assign/${pieceId}`, {
        instrument,
        userIds: selectedIds,
      });

      alert("Assigned!");
    } catch (err) {
      console.error(err);
      alert("Error assigning players");
    }
  };

  return (
    <div style={{ marginTop: 5 }}>
      <input
        placeholder="player1@email.com, player2@email.com"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        style={{ width: "70%" }}
      />
      <button onClick={assignUsers}>Assign</button>
    </div>
  );
}


export default AdminDashboard;