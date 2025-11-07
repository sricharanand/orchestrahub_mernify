import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PlayerDashboard from "./pages/PlayerDashboard";
import UploadPiece from "./pages/UploadPiece";
import Navbar from "./components/Navbar";
import PDFViewer from "./pages/PDFViewer";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      {/* always show navbar when user logged in */}
      {user && <Navbar />}

      <Routes>
        {/* public routes */}
        {/* usable when logged out too */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

        {/* protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/player" element={<PlayerDashboard />} />
        <Route path="/upload" element={<UploadPiece />} />
        <Route path="/viewer/:filePath" element={<PDFViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
