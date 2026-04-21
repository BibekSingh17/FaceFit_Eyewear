import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.scss"
import { toast } from 'react-toastify';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful! Please log in.");
        navigate("/login");
      } else {
        toast.error("Signup failed: " + (data.error || JSON.stringify(data)));
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred during signup.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* Logo */}
        <div className="icon">🔒</div>

        {/* Title */}
        <h2>Create an account</h2>
        <p className="subtitle">
          Virtual try-on glasses, AI recommendations & online ordering.
        </p>

        <form onSubmit={handleSignup}>
          {/* Email */}
          <div className="input-group">
            <label>Your Email</label>
            <input
              type="email"
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
              placeholder="Create a password"
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

          {/* Button */}
          <button type="submit" className="signup-btn">
            Get Started
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span>or continue with</span>
        </div>

        {/* Footer */}
        <p className="footer-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;