import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../login.css";
import { loginUser } from "../redux/authSlice";

import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (error) {
      setPassword("");
    }
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      navigate("/users");
    }
  };

  return (
    <div className="login-screen">
      <div className="login-form">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-group">
            <div className="form-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-container"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <div className="form-icon">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-container"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="remember-me-container">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="input-container"
            />
            <label className="text-sm">Remember Me</label>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
