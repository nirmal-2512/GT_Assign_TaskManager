import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../css/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to manage your tasks</p>

        <input className="login-input" type="email" placeholder="Email" />
        <input className="login-input" type="password" placeholder="Password" />

        <button className="login-button">Login</button>

        <div className="login-footer">
          Don’t have an account? <a href="/register">Register</a>
        </div>
      </form>
    </div>
  );
}
