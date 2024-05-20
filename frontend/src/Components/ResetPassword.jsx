import React, { useState } from "react";
import "../ComponentCSS/ResetPassword.css"
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPassword = () => {
    if (formData.newPassword == formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1>Reset Password</h1>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <div style={{display:'flex', flexDirection:"column", justifyContent:'center', alignItems:'center'}}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData,email:e.target.value})}
            />
          </div>
          <div style={{display:'flex', flexDirection:"column", justifyContent:'center', alignItems:'center'}}>
            <label>New Password:</label>
            <input
              type="password"
              name="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData,newPassword:e.target.value})}
            />
          </div>
          <div style={{display:'flex', flexDirection:"column", justifyContent:'center', alignItems:'center'}}>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData,confirmPassword:e.target.value})}
            />
          </div>
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
