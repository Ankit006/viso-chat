import mongoose from "mongoose";

const followerModel = mongoose.Schema({
  followerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  followerName: {
    type: String,
    required: true,
  },
  followerProfilePic: {
    type: String,
    required: true,
  },
  followingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  followingName: {
    type: String,
    required: true,
  },
  followingProfilePic: {
    type: String,
    required: true,
  },
});

const FollowerModel = mongoose.model("FollowerModel", followerModel);

export default FollowerModel;
