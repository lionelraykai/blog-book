import React, { useState, useEffect } from "react";
import "../ComponentCSS/Main.css";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { getBlog } from "../API/endpoints";
import HeaderLower from "./HeaderLower";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../Redux/actions/post";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {posts,loading} = useSelector((state) => state.posts)
  const [allPosts, setAllPosts] = useState([]);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const [render, setRender] = useState(false);
  useEffect(() => {
    dispatch(getPost()) 
  }, [render]);
  return (
    <>
      <HeaderLower setAllPosts={setAllPosts} />
      <div className="main-container">
        <div className="main-content">
          <h1 className="blog-heading">BLOG POSTS</h1>
          <div className="btns-main">
            <button className="btn-main" onClick={() => navigate("/create")}>
              Create New
            </button>
            <button className="btn-main" onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        </div>
        <div className="main">
          
          { loading? <span style={{backgroundColor:'red'}}>Loading...</span> :posts?.length ? (
            posts?.map((post, index) => {
              const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];
              const createDate = new Date(post.createdAt);
              let day = createDate.getDate();
              let monthIndex = createDate.getMonth();
              let year = createDate.getFullYear();
              let monthName = months[monthIndex];
              let currentDate = `${monthName} ${day}, ${year}`;
              return (
                <Post
                  post={post}
                  index={index}
                  currentDate={currentDate}
                  render={render}
                  setRender={setRender}
                />
              );
            })
          ) : (
            <h2 className="blog-message">No blogs to show</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
