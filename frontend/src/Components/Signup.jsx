import React, { useState } from "react";
import "../ComponentCSS/Login.css"; // Import the same CSS file used for the login page
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../API/endpoints";

const Signup = () => {
  const navigate = useNavigate();
  const [signupdetail, setSignupDetail] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleError = async () => {
    const error = {};
    if (!signupdetail.userName.trim()) {
      error.userName = "Name is required!";
    }
    if (!signupdetail.email.trim()) {
      error.email = "Email is required!";
    }
    if (!signupdetail.password.trim()) {
      error.password = "Password is required!";
    }
    if (!signupdetail.confirmPassword) {
      error.confirmPassword = "Please confirm your password!";
    } else if (Object.keys(errors).length === 0) {
      await signUp(signupdetail);
      alert("Account created successfully!");
      navigate("/");
    }
    setErrors(error);
  };

  return (
    <>
      <div className="login-container">
        {" "}
        {/* Use the same container class */}
        <div className="login-form">
          {" "}
          {/* Use the same form class */}
          <h1>Sign Up</h1> {/* Use the same heading style */}
          <p>
            Already have an account? <Link to="/">Login</Link>{" "}
            {/* Link to the login page */}
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
              type="text"
              placeholder="Username"
              value={signupdetail.userName}
              onChange={(e) => {
                setErrors({});
                setSignupDetail({ ...signupdetail, userName: e.target.value });
              }}
            />
            {errors.userName && (
              <span className="error">{errors.userName}</span>
            )}
            <input
              type="email"
              placeholder="Email"
              value={signupdetail.email}
              onChange={(e) => {
                setErrors({});
                setSignupDetail({ ...signupdetail, email: e.target.value });
              }}
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <input
              type="password"
              placeholder="Password"
              value={signupdetail.password}
              onChange={(e) => {
                setErrors({});
                setSignupDetail({ ...signupdetail, password: e.target.value });
              }}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            <input
              type="password"
              placeholder="Confirm password"
              value={signupdetail.confirmPassword}
              onChange={(e) => {
                setErrors({});
                setSignupDetail({
                  ...signupdetail,
                  confirmPassword: e.target.value,
                });
              }}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          <button onClick={() => handleError()}>CREATE ACCOUNT</button>
        </div>
      </div>
    </>
  );
};

export default Signup;
