import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getBlogDetails, deleteComment } from "../API/endpoints";
import { MdDelete } from "react-icons/md";

const BlogDetails = () => {
  const { state } = useLocation();
  const [postData, setPostData] = useState({});

  const getData = async () => {
    try {
      const res = await getBlogDetails(state?.id);
      setPostData(res.data);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteComment = async (postId, commentId) => {
    await deleteComment(postId, commentId);
    getData();
  };

  return (
    <div className="post-description-container">
      <h2 className="post-title">{postData.title}</h2>
      <p className="post-description">{postData.description}</p>
      {postData.image && (
        <img
          className="post-image"
          src={`${process.env.REACT_APP_API}/${postData.image}`}
          alt="Blog"
        />
      )}
      <p className="post-liked">
        Liked:{" "}
        {postData.liked ? (
          <FaHeart className="like" style={{ color: "red" }} />
        ) : (
          <FaRegHeart className="like" style={{ color: "black" }} />
        )}
      </p>
      <h3 className="comments-heading">Comments:</h3>
      <div className="comments-list">
        {postData.comments &&
          postData.comments.map((comment) => (
            <div key={comment._id} className="comment-container">
              <span className="comment-text">{comment.text}</span>
              <MdDelete
                className="delete-icon"
                onClick={() => handleDeleteComment(postData._id, comment._id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogDetails;
