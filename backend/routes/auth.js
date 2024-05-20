import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { upload } from "../middleware/fileUpload.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const authRouter = express.Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "srk001929@gmail.com",
    pass: "ohin yarc likt ornw",
  },
});
authRouter.post("/send-email", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Receiver email not found" });
    }
    const mailOptions = {
      from: "srk001929@gmail.com",
      to: email,
      subject: "Forgot Password",
      text: `Click on this link for reset password. http://localhost:3000/reset-password/${email}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});
authRouter.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists " });
    }
    const saltValue = 10;
    const hashPassword = await bcrypt.hash(password, saltValue);
    const user = new User({
      userName,
      email,
      password: hashPassword,
    });
    await user.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    console.log(err);
  }
});
authRouter.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User profile retrieved successfully", user });
  } catch (err) {
    console.log(err, "dfjdjjfdf");
  }
});

// Update user profile
// authRouter.put("/profile/:id", async (req, res) => {
//   const useId = req.params.id;
//   try {
//     const { userName, email, country, state, pincode } = req.body;
//     const user = await User.findById(useId).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     user.userName = userName || user.userName;
//     user.email = email || user.email;
//     user.country = country || user.country;
//     user.state = state || user.state;
//     user.pincode = pincode || user.pincode;
//     await user.save();
//     res
//       .status(200)
//       .json({ message: "User profile updated successfully", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

authRouter.put("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { userName, email, country, state, pincode } = req.body;
    user.userName = userName;
    user.country = country;
    user.state = state;
    user.pincode = pincode;
    user.email = email;
    await user.save();
    res.status(200).json({ message: "User is successfully updated", user });
  } catch (err) {
    console.log(err, "fsjkjf");
  }
});

authRouter.patch(
  "/profile/:id",
  upload.single("profilePhoto"),
  async (req, res) => {
    const userId = req.params.id;
    try {
      const profilePhoto = req.file.path;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.profilePhoto = profilePhoto;
      await user.save();
      res.status(200).json({ message: "User is successfully updated", user });
    } catch (err) {
      console.log("err", err);
    }
  }
);
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    if (!password || !(email || userName)) {
      return res.json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({
      $or: [
        {
          email,
        },
        { userName },
      ],
    });
    if (!existingUser) {
      return res.json({ message: "User not exists" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY
    );
    const userId = existingUser._id;
    res.status(200).json({ message: "Login Successfully", token, userId });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


authRouter.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const saltValue = 10;
    const hashPassword = await bcrypt.hash(newPassword, saltValue);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to reset password", error: error.message });
  }
});

authRouter.post("/change-password", async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid old password" });
    }
    const saltValue = 10;
    const hashNewPassword = await bcrypt.hash(newPassword, saltValue);
    user.password = hashNewPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to change password", error: error.message });
  }
});


export default authRouter;
