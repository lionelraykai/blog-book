import React, { useState } from "react";
import "../ComponentCSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../API/endpoints";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [logindetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleError = async () => {
    const error = {};
    setLoading(true);
    if (!logindetail.email.trim()) {
      error.email = "Email is required!";
      setLoading(false);
    }
    if (!logindetail.password.trim()) {
      error.password = "Please enter password!";
      setLoading(false);
    } else if (Object.keys(errors).length === 0) {
      await login(logindetail)
        .then((res) => {
          if (res.data.token && res.status == 200) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            toast.success(res.data.message);
            setLoading(false);
            navigate("/blog");
          } else {
            setLoading(false);
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
    setErrors(error);
  };
  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={logindetail.email}
              onChange={(e) => {
                setErrors({});
                setLoginDetail({ ...logindetail, email: e.target.value });
              }}
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <input
              type="password"
              placeholder="Password"
              value={logindetail.password}
              onChange={(e) => {
                setErrors({});
                setLoginDetail({ ...logindetail, password: e.target.value });
              }}
            />
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
          <button disabled={loading} onClick={() => handleError()}>
            {loading ? "Loading..." : " Login"}
          </button>
          <div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
