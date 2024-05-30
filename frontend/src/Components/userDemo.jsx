// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import {
  getUserProfile,
  updateProfilePhoto,
  updateUserProfile,
} from "../API/endpoints";
import "../ComponentCSS/userProfile.css";

const UserProfile = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});
  const [profilePic, setProfilePic] = useState({});
  const [edit, setEdit] = useState(true);

  // Function to fetch user data from the API
  const getUserInfo = async () => {
    try {
      const res = await getUserProfile(userId);
      setUserData(res.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to handle profile photo upload
  const handleProfileUpload = async () => {
    if (profilePic?.name) {
      const formData = new FormData();
      formData.append("profilePhoto", profilePic);
      await updateProfilePhoto(formData, userId);
      await getUserInfo();
      setProfilePic({});
      setEdit(true);
    } else {
      setEdit(true);
    }
  };

  // Function to handle profile update
  const handleUpdate = async () => {
    await updateUserProfile(userData, userId);
    handleProfileUpload();
    await getUserInfo();
  };

  // Fetch user info on component mount
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="container">
      <div className="profile-header">
        <img
          className="profile-image"
          src={`https://blog-book-1.onrender.com/${userData.profilePhoto}`}
          alt="Profile"
        />
        {edit ? (
          <button className="edit-button" onClick={() => setEdit(false)}>
            Edit
          </button>
        ) : (
          <button className="cancel-button" onClick={() => setEdit(true)}>
            Cancel
          </button>
        )}
      </div>
      {edit ? (
        // Display user info in read-only mode
        <div className="user-info-container">
          <div className="info-item">
            <strong>User Name:</strong> {userData.userName}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {userData.email}
          </div>
          <div className="info-item">
            <strong>Country:</strong> {userData.country}
          </div>
          <div className="info-item">
            <strong>State:</strong> {userData.state}
          </div>
          <div className="info-item">
            <strong>Pincode:</strong> {userData.pincode}
          </div>
        </div>
      ) : (
        // Display user info in edit mode
        <div className="user-info-edit-container">
          <input
            type="text"
            className="edit-input"
            value={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
          />
          <input
            type="email"
            className="edit-input"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <input
            type="text"
            className="edit-input"
            value={userData.country}
            onChange={(e) =>
              setUserData({ ...userData, country: e.target.value })
            }
          />
          <input
            type="text"
            className="edit-input"
            value={userData.state}
            onChange={(e) =>
              setUserData({ ...userData, state: e.target.value })
            }
          />
          <input
            type="text"
            className="edit-input"
            value={userData.pincode}
            onChange={(e) =>
              setUserData({ ...userData, pincode: e.target.value })
            }
          />
          <button className="save-button" onClick={handleUpdate}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
