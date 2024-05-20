import React, { useState } from "react";
import "../ComponentCSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../API/endpoints";
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [logindetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleError = async () => {
    const error = {};
    if (!logindetail.email.trim()) {
      error.email = "Email is required!";
    }
    if (!logindetail.password.trim()) {
      error.password = "Please enter password!";
    } else if (Object.keys(errors).length === 0) {
      const res = await login(logindetail);
      if (res.data.token && res.status == 200 ) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        toast.success(res.data.message);
        navigate("/blog");
      }else{
        toast.error(res.data.message);
      }
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
          <button onClick={() => handleError()}>Login</button>
          <div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
