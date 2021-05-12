import express from "express";
import dotenv from "dotenv";
import UserModel from "../model/UserModel.js";
import checkAccessToken from "../auth/accessAuth.js";
import FollowerModel from "../model/followers.js";
import redisClient from "../module/handleRedis.js";
import { promisify } from "util";

dotenv.config();
const router = express.Router();

/**
 *         --------- signup rouer ------------
 */

router.post("/signup", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    user.follower = 0;
    user.following = 0;
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    await user.save();
    //  set the refresh token to cookie
    res.cookie("rf", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.json({
      status: "success",
      accessToken,
      userId: user._id,
      username: user.username,
      email: user.email,
      follower: user.follower,
      following: user.following,
      profileImage: user.profileImage.imageUrl,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "issue to create account",
    });
  }
});

/**
 *  ------------- login router -----------------
 */

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user)
      return res.json({
        status: "error",
        message: "username or password is incorrect",
      });
    // check if password is correct
    const checkPassword = await user.isValidPassword(req.body.password);
    if (!checkPassword)
      return res.json({
        status: "error",
        message: "username or password is incorrect",
      });

    // generate accessToken
    const accessToken = await user.generateAccessToken();
    // generate refreshToken
    const refreshToken = await user.generateRefreshToken();
    res.cookie("rf", refreshToken, {
      sameSite: "lax",
      httpOnly: true,
      secure: true,
      maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.json({
      status: "success",
      accessToken,
      userId: user._id,
      username: user.username,
      email: user.email,
      follower: user.follower,
      following: user.following,
      profileImage: user.profileImage.imageUrl,
    });
  } catch (err) {
    res.json({ status: "error" });
  }
});

/**
 *  ------------ logout user -----------
 */

router.get("/logout", checkAccessToken, async (req, res) => {
  try {
    res.clearCookie("rf");
    res.json({
      status: "success",
    });
  } catch (Err) {
    res.json({
      status: "error",
    });
  }
});

/**
 * -------------  delete user account ---------
 */

router.delete("/removeUser", checkAccessToken, async (req, res) => {
  try {
    await UserModel.deleteOne({ _id: req.user._id });
    res.json({
      status: "success",
    });
  } catch (err) {
    res.json({
      status: "error",
    });
  }
});

/**
 *  ---------- get  user information ------------
 */

router.get("/userInfo", checkAccessToken, async (req, res) => {
  res.json({
    status: "success",
    userId: req.user._id,
    username: req.user.username,
    email: req.user.email,
    follower: req.user.follower,
    following: req.user.following,
    profileImage: req.user.profileImage.imageUrl,
  });
});

/**
 *  --------------- search an user account -----------
 */

router.get("/searchUser", async (req, res) => {
  try {
    const users = await UserModel.find({
      username: req.query.username,
    }).select(["_id", "username", "profileImage.imageUrl"]);
    if (users.length === 0) {
      res.json({
        status: "not found",
      });
    } else {
      res.json({
        status: "success",
        result: users,
      });
    }
  } catch (err) {
    res.json({
      status: "error",
    });
  }
});

router.post("/otherUserInfo", async (req, res) => {
  try {
    const userInfo = await UserModel.findById(req.body.otherUserId);
    let following = false;

    if (req.body.accountId !== "") {
      const isFollowing = await FollowerModel.find({
        followerId: req.body.accountId,
        followingId: req.body.otherUserId,
      });
      if (isFollowing.length > 0) {
        following = true;
      }
    }
    res.json({
      status: "success",
      userId: userInfo._id,
      username: userInfo.username,
      profileImage: userInfo.profileImage.imageUrl,
      follower: userInfo.follower,
      following: userInfo.following,
      isFollowing: following,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "error while fetching info",
    });
  }
});

/**
 *  ---------- handle follow --------------
 */

router.post("/follow", checkAccessToken, async (req, res) => {
  try {
    const alearyFollowing = await FollowerModel.findOne({
      followerId: req.body.follower,
      followingId: req.body.following,
    });

    if (alearyFollowing) return;

    const followerInfo = await UserModel.findById(req.body.follower);
    const followingInfo = await UserModel.findById(req.body.following);
    const followerModel = new FollowerModel({
      followerId: followerInfo._id,
      followerName: followerInfo.username,
      followerProfilePic: followerInfo.profileImage.imageUrl,
      followingId: followingInfo._id,
      followingName: followingInfo.username,
      followingProfilePic: followingInfo.profileImage.imageUrl,
    });
    followerInfo.following++;
    followingInfo.follower++;

    await followerModel.save();
    await followerInfo.save();
    await followingInfo.save();
    res.json({ status: "success" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

router.post("/unfollow", checkAccessToken, async (req, res) => {
  try {
    const followerInfo = await UserModel.findById(req.body.follower);
    const followingInfo = await UserModel.findById(req.body.following);

    await FollowerModel.deleteOne({
      followerId: req.body.follower,
      followingId: req.body.following,
    });
    followerInfo.following--;
    followingInfo.follower--;

    await followerInfo.save();
    await followingInfo.save();
    res.json({ status: "success" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

router.get("/getAllFollowers", checkAccessToken, async (req, res) => {
  try {
    const following = await FollowerModel.find({
      followerId: req.user._id,
    })
      .select("followingId")
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit));

    const numberOfFollowing = await FollowerModel.find({
      followerId: req.user._id,
    }).countDocuments();

    let followingIds = following.map((following) => following.followingId);
    const followingUsersDetails = await UserModel.find({
      _id: { $in: followingIds },
    }).select(["_id", "username", "profileImage.imageUrl"]);

    res.json({
      status: "success",
      data: followingUsersDetails,
      numberOfFollowing,
    });
  } catch (err) {
    res.json({ status: "error" });
  }
});

router.put("/updateUserName", checkAccessToken, async (req, res) => {
  try {
    const checkPassword = await req.user.isValidPassword(req.body.password);
    if (!checkPassword) {
      res.json({
        status: "error",
        message: "password doesn't match",
      });
    } else {
      req.user.username = req.body.username;
      await req.user.save();
      res.json({
        status: "success",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: "error while updating username",
    });
  }
});

router.put("/updatePassword", checkAccessToken, async (req, res) => {
  try {
    const checkPassword = await req.user.isValidPassword(req.body.oldPassword);
    if (!checkPassword) {
      res.json({
        status: "error",
        message: "password doesn't match",
      });
    } else {
      req.user.password = req.body.newPassword;
      await req.user.save();
      res.json({
        status: "success",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
    });
  }
});

router.post("/logout", checkAccessToken, (req, res) => {
  try {
    res.clearCookie("rf");
    redisClient.srem("active", `${req.user._id}`);
    res.json({
      status: "success",
    });
  } catch (Err) {
    res.json({
      status: "error",
      message: Err,
    });
  }
});

export default router;
