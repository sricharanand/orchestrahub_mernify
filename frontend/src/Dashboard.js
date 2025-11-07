import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
    else if (user.role === "admin") navigate("/admin");
    else navigate("/player");
  }, [user, navigate]);

  return null;
}

export default Dashboard;