import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { deleteComment, getBlogDetails } from "../API/endpoints";
import { MdDelete } from "react-icons/md"; 
import "../ComponentCSS/postDescription.css";


const PostDescription = () => {
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

  const handleDeleteComment = async (postId,commentId) => {
    await deleteComment(postId,commentId)
     getData()
  };
  return (
    <div className="post-description-container">
      <h2 className="post-title">{postData.title}</h2>
      <p className="post-description">{postData.description}</p>
      {postData.image && (
        <img
          className="post-image"
          src={`http://localhost:8000/${postData.image}`}
          alt="Blog"
        />
      )}
      <p className="post-liked">Liked: {postData.liked ? "Yes" : "No"}</p>
      <h3 className="comments-heading">Comments:</h3>
      <div className="comments-list">
        {postData.comments &&
          postData.comments.map((comment) => (
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <span key={comment._id} className="comment">
              {comment.text}
              <MdDelete
                style={{ fontSize: 20, cursor: "pointer" }}
                onClick={() => handleDeleteComment(postData._id,comment._id)}
              />
            </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostDescription;
