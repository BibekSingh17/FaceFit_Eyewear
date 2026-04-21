import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.scss";
import { toast } from 'react-toastify';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Login failed: " + (data.error || JSON.stringify(data)));
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="login-box">
          <div className="icon">🔒</div>

          <h2>Welcome Back</h2>
          <p className="subtitle">
            Sign in to continue your FaceFit Eyewear experience
          </p>

          <form onSubmit={handleSignIn}>
            {/* Email */}
            <div className="input-group">
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="input-group password-group">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="forgot">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="signin-btn">
              ⚡ Sign In
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="info-box">
          <h2>FaceFit Eyewear Journey</h2>
          <p className="subtitle">
            Smart eyewear shopping with AI-powered virtual try-on
          </p>

          <div>
            <h3>1. Virtual Try-On Glasses</h3>
            <p>
              Try different spectacle frames using real-time camera and face detection.
            </p>
          </div>

          <div className="highlight">
            <h3>2. AI Glasses Recommendation</h3>
            <p>
              AI analyzes your face shape and suggests the best frames.
            </p>
          </div>

          <div>
            <h3>3. Order Your Spectacles</h3>
            <p>
              Add prescription and place your order securely.
            </p>
          </div>

          <div>
            <h3>4. Fast Delivery & Tracking</h3>
            <p>
              Doorstep delivery with real-time tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;