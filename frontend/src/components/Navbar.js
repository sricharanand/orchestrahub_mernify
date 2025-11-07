import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav style={{ background: "#eee", padding: "10px" }}>
      <Link to="/dashboard" style={{ marginRight: 15 }}>Dashboard</Link>
      {user?.role === "admin" && (
        <Link to="/upload" style={{ marginRight: 15 }}>Upload Piece</Link>
      )}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;