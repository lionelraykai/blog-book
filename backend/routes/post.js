import express from "express";
import { Post } from "../models/post.js";
import { User } from "../models/user.js";
import { applyMiddleWare } from "../middleware/auth.js";
import { upload } from "../middleware/fileUpload.js";
import moment from "moment";

const postRouter = express.Router();

postRouter.post(
  "/posts",
  applyMiddleWare,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    try {
      const post = new Post({
        title: req.body.title,
        description: req.body.description,
        image: req.file.path,
        liked: req.body.liked,
        user: req.user,
      });

      const newPost = await post.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

postRouter.get("/posts", applyMiddleWare, async (req, res) => {
  try {
    const userId = req.user;
    const posts = await Post.find({ user: userId });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

postRouter.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await Post.findById(id);
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
});

postRouter.put(
  "/posts/:id",
  applyMiddleWare,
  upload.single("image"),
  async (req, res) => {
    const id = req.params.id;
    const { title, description, liked } = req.body;
    const image = req?.file?.path;
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          title,
          description,
          image,
        },
        { new: true }
      );
      res.json(updatedPost);
    } catch (err) {
      console.log(err);
    }
  }
);

postRouter.patch("/posts/:id", applyMiddleWare, async (req, res) => {
  const id = req.params.id;
  const updateFields = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    res.json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update post" });
  }
});

postRouter.delete("/posts/:id", applyMiddleWare, async (req, res) => {
  const id = req.params.id;
  try {
    const deletePost = await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted Successfully" });
  } catch (err) {
    console.log(err);
  }
});

postRouter.post("/posts/:id/comments", async (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.comments.push({ text });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.log(err, "Error during creating comments");
  }
});

postRouter.delete("/posts/:postId/comments/:commentId", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.comments.pull(commentId);
    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err, "erer");
  }
});

postRouter.get("/filtered-posts", async (req, res) => {
  try {
    const { title, createdAt } = req.query;
    let query = {};
    if (title) {
      query.title = title;
    }
    if (createdAt) {
      const startOfDay = moment(createdAt).startOf("day").toDate();
      const endOfDay = moment(createdAt).endOf("day").toDate();
      query.createdAt = { $gte: startOfDay, $lte: endOfDay };
    }
    const posts = await Post.find(query);
    res.json(posts);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
postRouter.get("/searchData",applyMiddleWare, async (req, res) => {
  try {
    const { searchText } = req.query;
    if (!searchText) {
      return res.json([]);
    }
    const posts = await Post.find({
      user: req.user, 
      title: { $regex: searchText, $options: "i" },
    });
    res.json(posts);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

postRouter.delete("/deleteAll", applyMiddleWare, async (req, res) => {
  try {
    await Post.deleteMany({});
    res.json({ message: "All posts deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default postRouter;
