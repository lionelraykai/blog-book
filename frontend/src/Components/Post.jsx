import React, { useEffect, useState } from "react";
import "../ComponentCSS/Post.css";
import { FaHeart, FaComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import {
  blogComments,
  deleteBlog,
  getBlog,
  updateBlogByPatch,
} from "../API/endpoints";

const Post = ({ post, currentDate, render, setRender }) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleEdit = async (id) => {
    try {
      setEditing(false);
      setRender(!render);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedTitle(post.title);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      setRender(!render);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLike = async (postId) => {
    await updateBlogByPatch({ liked: !post.liked }, postId);
    setRender(!render);
  };

  const sendComment = async (text, postId) => {
    await blogComments(text, postId);
    setRender(!render);
  };

  return (
    <div className="post-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <MdEdit
          style={{
            fontSize: 20,
            cursor: "pointer",
          }}
          onClick={() => navigate(`/blogDetails/${post._id}`)}
        />
      </div>

      <div className="post-image-container">
        <img
          src={`${process.env.REACT_APP_API}/${post.image}`}
          className="post-image"
          alt="Post Image"
        />
      </div>

      <div className="post-content">
        <div className="post-title">{post.title}</div>
        <div className="post-description">{post.description}</div>
        <div className="post-footer">
          <div className="user-details">
            <img
              className="profile-img"
              src={`${process.env.REACT_APP_API}/${post.image}`}
              alt="profile"
            />

            <div className="user-info">
              <p className="user-name">{post.author}</p>
              <p className="post-date">{currentDate}</p>
            </div>
          </div>
          <div className="actions">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="like-action" onClick={() => toggleLike(post._id)}>
                {post.liked ? (
                  <FaHeart className="like" style={{ color: "red" }} />
                ) : (
                  <FaRegHeart className="like" style={{ color: "black" }} />
                )}
              </div>
              <div
                className="comment-action"
                onClick={() => setModalIsOpen(true)}
              >
                <FaComment className="comment" />
              </div>
              <div
                className="delete-action"
                onClick={() => handleDelete(post._id)}
              >
                <MdDelete style={{ fontSize: 20, cursor: "pointer" }} />
              </div>
            </div>

            <div>
              {post.comments.length ? (
                <>
                  <span style={{ color: "black" }}>Comments:</span>
                  {post.comments.slice(0, 1).map((item) => {
                    return <span style={{ color: "black" }}>{item.text}</span>;
                  })}
                  <p
                    style={{ textAlign: "right" }}
                    onClick={() =>
                      navigate("/postDescription", {
                        state: {
                          id: post._id,
                        },
                      })
                    }
                  >
                    See more
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Comment"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            width: "40%",
            height: "40%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff", // White background
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", // Shadow effect
            borderRadius: "8px", // Rounded corners
            padding: "20px", // Padding
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ marginBottom: "20px" }}>Add Comment</h2>
          </div>
          <div>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your comment here..."
              style={{
                width: "90%", // Increased width
                marginBottom: "20px", // Margin bottom
                padding: "10px", // Padding
                borderRadius: "4px", // Rounded corners
                border: "1px solid #ccc", // Border
              }}
            />
          </div>
          <div>
            <button
              onClick={() => {
                sendComment({ text }, post._id);
                setModalIsOpen(false);
              }}
              style={{
                padding: "10px 20px", // Padding
                borderRadius: "4px", // Rounded corners
                backgroundColor: "#007bff", // Blue color
                color: "#fff", // White text color
                border: "none", // No border
                cursor: "pointer", // Cursor pointer
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Post;
