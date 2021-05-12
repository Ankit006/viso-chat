import mongoose from "mongoose";

const userPost = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    profileImg: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    likes: {
      type: Number,
    },
    likedPeople: [{ type: mongoose.Schema.Types.ObjectId }],
    comments: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        username: String,
        profileImage: String,
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("UserPost", userPost);

export default Post;
