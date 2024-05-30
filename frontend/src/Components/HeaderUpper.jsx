import React, { useState, useEffect } from "react";
import "../ComponentCSS/HeaderUpper.css";
import { FaRocketchat, FaCaretDown } from "react-icons/fa";
import profile from "../Assets/profile1.avif";
import { Link } from "react-router-dom";
import { getUserProfile } from "../API/endpoints";

const HeaderUpper = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});
  const getUserInfo = async () => {
    try {
      const res = await getUserProfile(userId);
      setUserData(res.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      <div className="container-HU">
        <div className="rightHU">
          <p className="headingall">Chatterly</p>
          <FaRocketchat className="chat-icon" />
        </div>
        <Link
          className="leftHU"
          style={{ textDecoration: " none" }}
          to={"/userProfile"}
        >
          <img
            className="profile-img"
            src={`${process.env.REACT_APP_API}/${userData.profilePhoto}`}
            alt="profile-img"
          />
          <Link
            style={{ textDecoration: "none", fontSize: 20, fontWeight: "700" }}
            to={"/userProfile"}
          >
            {userData.userName}
          </Link>
          {/* <FaCaretDown className="c1" /> */}
        </Link>
      </div>
    </>
  );
};

export default HeaderUpper;
