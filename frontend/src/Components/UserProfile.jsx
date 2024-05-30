import React, { useEffect, useState } from "react";
import {
  getUserProfile,
  updateProfilePhoto,
  updateUserProfile,
} from "../API/endpoints";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import { getBlog } from "../API/endpoints";
import glaxy from "../Assets/dark.gif";

const UserProfile = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});
  const [profilePic, setProfilePic] = useState({});
  const [edit, setEdit] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const getUserInfo = async () => {
    try {
      const res = await getUserProfile(userId);
      setUserData(res.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleProfileUpload = async () => {
    if (profilePic?.name) {
      const formData = new FormData();
      formData.append("profilePhoto", profilePic);
      await updateProfilePhoto(formData, userId);
      getUserInfo();
      setEdit(true);
    } else {
      setEdit(true);
    }
  };
  const fetchPosts = async () => {
    try {
      const res = await getBlog();
      if (res.data) {
        setAllPosts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    await updateUserProfile(userData, userId);
    handleProfileUpload();
    getUserInfo();
  };
  useEffect(() => {
    getUserInfo();
    fetchPosts();
  }, []);
  return (
    <>
      {edit ? (
        <div
          style={{
            margin: 30,
            width: "100%",
            maxHeight: 400,
            overflow: "hidden",
          }}
          className="demo"
        >
          <img
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            src={`${process.env.REACT_APP_API}/${userData.profilePhoto}`}
            alt="Profile"
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h4 style={{ color: "rgba(0,0,0,0.7)", marginBottom: 5 }}>
              Profile Photo
            </h4>
            <input
              style={{
                border: "1px solid gray",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 30,
                paddingLeft: 30,
                width: 300,
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                marginBottom: 30,
              }}
              type="file"
              onChange={(e) => {
                if (e.target.files.length) {
                  const selectedFile = e.target.files[0];
                  setProfilePic(selectedFile);
                } else {
                  setProfilePic({});
                }
              }}
            />
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: 30,
          backgroundImage: {},
        }}>
        {edit ? (
          <button
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "10px 32px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              transitionDuration: "0.4s",
              cursor: "pointer",
              width: 100,
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
            onClick={() => setEdit(false)}
          >
            Edit
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "gray",
              border: "none",
              color: "white",
              padding: "10px 32px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              transitionDuration: "0.4s",
              cursor: "pointer",
              width: 100,
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
            onClick={() => {
              getUserInfo();
              setEdit(true);
            }}
          >
            Cancel
          </button>
        )}
      </div>
      {edit ? (
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 50,
          }}
        >
          <div style={{ gap: 10 }}>
            <div
              style={{
                border: "1px solid gray",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 30,
                paddingLeft: 30,
                width: 300,
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                marginBottom: 30,
              }}
              className="demo"
              
            >
              <p
                style={{ margin: "5px 0", color: "white", textAlign: "center" }}
              >
                <strong>User Name:</strong> {userData.userName}
              </p>
            </div>
            <div
              style={{
                border: "1px solid gray",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 30,
                paddingLeft: 30,
                width: 300,
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                marginBottom: 30,
              }}
              className="demo"
            >
              <p
                style={{ margin: "5px 0", color: "white", textAlign: "center" }}
              >
                <strong>Email:</strong> {userData.email}
              </p>
            </div>
            <div
              style={{
                border: "1px solid gray",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 30,
                paddingLeft: 30,
                width: 300,
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                marginBottom: 30,
              }}
              className="demo"
            >
              <p
                style={{ margin: "5px 0", color: "white", textAlign: "center" }}
              >
                <strong>Country:</strong> {userData.country}
              </p>
            </div>
            <div
              style={{
                border: "1px solid gray",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 30,
                paddingLeft: 30,
                width: 300,
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                marginBottom: 30,
              }}
              className="demo"
            >
              <p
                style={{ margin: "5px 0", color: "white", textAlign: "center" }}
              >
                <strong>State:</strong> {userData.state}
              </p>
            </div>
            <div
              style={{
                border: "1px solid gray",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 30,
                paddingLeft: 30,
                width: 300,
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                marginBottom: 30,
              }}
              className="demo"
            >
              <p
                style={{ margin: "5px 0", color: "white", textAlign: "center" }}
              >
                <strong>Pincode:</strong> {userData.pincode}
              </p>
            </div>
          </div>
          <div style={{ paddingLeft: 40 }}>
            <h1 style={{ textAlign: "center",color:'white',padding:5,borderRadius:20 }}  className="demo">Blogs</h1>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="mySwiper"
              style={{ marginTop: 30 }}
              
            >
              {allPosts.map((item, index) => {
                console.log(item, "dsfjjdsf");
                return (
                  <SwiperSlide key={index}>
                    <div style={{ display: "inline", borderRadius: 20 }}>
                      <img
                        src={`${process.env.REACT_APP_API}/${item.image}`}
                        style={{ objectFit: "contain" }}
                      ></img>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <h4 style={{ color: "rgba(0,0,0,0.7)", marginBottom: 5 }}>
              User Name
            </h4>
            <input
              type="text"
              name="userName"
              style={{
                border: "1px solid gray",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 30,
                paddingLeft: 30,
                width: 300,
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                marginBottom: 30,
              }}
              value={userData.userName}
              onChange={(e) => {
                setUserData({ ...userData, userName: e.target.value });
              }}
            />
          </div>
          <div>
            <h4 style={{ color: "rgba(0,0,0,0.7)", marginBottom: 5 }}>Email</h4>
            <input
              style={{
                border: "1px solid gray",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 30,
                paddingLeft: 30,
                width: 300,
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                marginBottom: 30,
              }}
              type="email"
              name="email"
              value={userData.email}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
          </div>
          <div>
            <h4 style={{ color: "rgba(0,0,0,0.7)", marginBottom: 5 }}>
              Country
            </h4>
            <input
              style={{
                border: "1px solid gray",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 30,
                paddingLeft: 30,
                width: 300,
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                marginBottom: 30,
              }}
              type="text"
              name="country"
              value={userData.country}
              onChange={(e) => {
                setUserData({ ...userData, country: e.target.value });
              }}
            />
          </div>
          <div>
            <h4 style={{ color: "rgba(0,0,0,0.7)", marginBottom: 5 }}>State</h4>
            <input
              style={{
                border: "1px solid gray",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 30,
                paddingLeft: 30,
                width: 300,
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                marginBottom: 30,
              }}
              type="text"
              name="state"
              value={userData.state}
              onChange={(e) => {
                setUserData({ ...userData, state: e.target.value });
              }}
            />
          </div>
          <div>
            <h4 style={{ color: "rgba(0,0,0,0.7)", marginBottom: 5 }}>
              PinCode
            </h4>
            <input
              style={{
                border: "1px solid gray",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 30,
                paddingLeft: 30,
                width: 300,
                borderRadius: 5,
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                marginBottom: 30,
              }}
              type="text"
              name="pincode"
              value={userData.pincode}
              onChange={(e) => {
                setUserData({ ...userData, pincode: e.target.value });
              }}
            />
          </div>
          <button
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "10px 32px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              transitionDuration: "0.4s",
              cursor: "pointer",
              width: 100,
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
            onClick={() => {
              {
                handleUpdate();
                setEdit(true);
              }
            }}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default UserProfile;
