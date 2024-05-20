import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../ComponentCSS/Login.css";
import Modal from "react-modal";
import { sendMail } from "../API/endpoints";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleChange = (event) => {
    setEmail(event.target.value);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setErrors({ email: "Email is required!" });
    } else {
      await sendMail({email})
      setModalIsOpen(true);
      console.log("Email submitted:", email);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1>Forgot Password</h1>
          <p>
            Remembered your password? <Link to="/">Log In</Link>
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
              value={email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Reset Password"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            width: "300px",
            minHeight: "200px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "8px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <div>
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            A password reset link has been sent to your registered email. Please
            check your inbox.
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/");
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ForgotPassword;
