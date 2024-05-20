import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getBlogDetails, updateBlog } from "../API/endpoints";
import { useDispatch } from "react-redux";
import { updatePosts } from "../Redux/actions/post";

const PostDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  const getData = async () => {
    const res = await getBlogDetails(id);
    setBlogDetails({
      title: res.data.title,
      description: res.data.description,
      image: res.data.image,
    });
  };
  const handleCreate = async () => {
    const error = {};

    if (!blogDetails.title.trim()) {
      error.title = "Please enter a title for your blog!";
    }
    if (!blogDetails.description.trim()) {
      error.description = "Please enter a description!";
    }
    if (!blogDetails.image) {
      error.image = "Please select an image!";
    }

    if (Object.keys(error).length === 0) {
      try {
        const formData = new FormData();
        formData.append("title", blogDetails.title);
        formData.append("description", blogDetails.description);
        formData.append("image", blogDetails.image);
        dispatch(updatePosts( {formData, id} ));
        alert("Blog updated successfully");
        navigate("/blog");
      } catch (error) {
        // Handle error
        console.error("Error creating blog:", error);
        alert("Failed to create blog. Please try again.");
      }
    }

    setErrors(error);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="post-details-container">
      <div className="background-animation"></div>
      <div className="post-form">
        <h2>Update Blog ❤️</h2>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={blogDetails.title}
            onChange={(e) => {
              setErrors({});
              setBlogDetails({ ...blogDetails, title: e.target.value });
            }}
          />
          {errors.title && <span className="error">{errors.title}</span>}
          <input
            type="text"
            placeholder="Description"
            value={blogDetails.description}
            onChange={(e) => {
              setErrors({});
              setBlogDetails({
                ...blogDetails,
                description: e.target.value,
              });
            }}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 10,
            }}
          >
            <input
              type="file"
              className="file"
              style={{ width: "50%", margin: 0 }}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files.length) {
                  const selectedFile = e.target.files[0];
                  setBlogDetails({ ...blogDetails, image: selectedFile });
                } else {
                  setBlogDetails({ ...blogDetails, image: {} });
                }
              }}
            />
            {/* <span style={{ color: "black", width: "50%" }}>
              {blogDetails.image}
            </span> */}
          </div>

          {errors.image && <span className="error">{errors.image}</span>}
          {/* {blogDetails.image && (
            <img
              src={blogDetails.image}
              alt="Blog Preview"
              className="image-preview"
            />
          )} */}
          <button onClick={() => handleCreate()}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
