import React, { useState, useEffect } from "react";
import "../ComponentCSS/HeaderLower.css";
import { FaSearch } from "react-icons/fa";
import { getFilteredPosts, getBlog, searchData } from "../API/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { getPostForFilter, fetchFilteredPosts } from "../Redux/actions/post";
import { useNavigate } from "react-router-dom";

const HeaderLower = ({ setAllPosts }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { postsForFilter } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [createdAt, setCreatedAt] = useState("");
  const [allBlogs, setAllBlogs] = useState([]);
  const [run, setRun] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchPost, setSearchPost] = useState([]);

  const fetchPosts = async () => {
    dispatch(getPostForFilter());
  };

  const handleFilter = async () => {
    dispatch(fetchFilteredPosts({ title, createdAt }));
  };
  const handleDateChange = (date) => {
    setCreatedAt(date);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const handleSearch = async (searchText) => {
    const res = await searchData(searchText);
    setSearchPost(res.data);
  };

  useEffect(() => {
    if (run) {
      handleFilter();
    }
  }, [title, createdAt]);
  return (
    <div className="container-HL">
      <div>
        <p className="filter headingall">Filters</p>
      </div>
      <div className="select-container">
        <select
          className="select-field"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value == "All" ? "" : e.target.value);
            setRun(true);
          }}
        >
          <option value="All">All</option>
          {postsForFilter.length != 0
            ? postsForFilter?.map((post) => (
                <option key={post._id} value={post?.title}>
                  {post?.title}
                </option>
              ))
            : null}
        </select>
      </div>

      <div className="date-input-container">
        <input
          className="field3 date-input"
          type="date"
          placeholder="Search here"
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </div>
      <div class="search-container">
        <div>
          <input
            class="search-input"
            type="text"
            placeholder="Search here"
            value={searchText}
            onChange={(e) => {
              const updatedText = e.target.value;
              setSearchText(updatedText);
              handleSearch(updatedText);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(searchText);
              }
            }}
          />
        </div>

        <div class="button-container">
          <button class="button">
            <FaSearch className="search" />
          </button>
        </div>
        <div
          style={{
            // backgroundColor: "white",
            position: "absolute",
            top: 30,
            marginTop: 20,
          }}
        >
          {searchPost.map((item) => {
            return (
              <div
                key={item._id}
                className="post-item"
                onClick={() =>
                  navigate("/blogDetails", {
                    state: {
                      id: item._id,
                    },
                  })
                }
              >
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeaderLower;
