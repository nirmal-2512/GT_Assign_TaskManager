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
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="login-container">
          <div className="login-left">
            <h1 className="text-4xl font-semibold text-purple-900">
              <span className="text-purple-900 font-serif">Task</span>
              {/* <span className="text-red-800">/</span> */}
              <span className="text-blue-800 font-bold">Manager</span>
              {/* Task Manager */}
            </h1>
            Welcome to Task Manager: a simple and effective solution for
            disciplined task scheduling.
            <input
              type="email"
              placeholder="Email"
              className="login-input mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-row">
              <input
                type="password"
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-btn">Login In</button>
            <p className="text-xl mt-3 text-center text-white">
              <span className="text-white"> No account? </span>
              <Link to="/register" className="text-indigo-300">
                Register
              </Link>
            </p>
          </div>

          <div
            className="login-right"
            style={{ backgroundImage: "url(../../src/css/image.png)" }}
          >
            <div className="overlay-text">
              Finally, all your work in one place
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
