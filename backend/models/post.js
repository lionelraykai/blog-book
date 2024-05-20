import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    liked: {
      type: Boolean,
      default: false,
    },
    user:{
      type: String
    },
    comments: [
      {
        text: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    updated_Date: {
      type: Date,
    },
  },
  {
    timestamps: true, 
  }
);

export const Post = mongoose.model("Post", postSchema);
