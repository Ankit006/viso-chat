import express from "express";
import multer from "multer";
import cloudenary from "cloudinary";
import authentication from "../auth/accessAuth.js";
import cloudConfig from "../module/cloudenaryConf.js";
import Post from "../model/post.js";

const postRouter = express.Router();
const cloud = cloudenary.v2;
const upload = multer();

// setup cloudenary
cloudConfig(cloud);

postRouter.post(
  "/posts",
  authentication,
  upload.single("post"),
  async (req, res) => {
    try {
      const buff = req.file.buffer.toString("base64");
      const imgResponse = await cloud.uploader.upload(
        `data:${req.file.mimetype};base64,` + buff,
        {
          folder: `viso/posts/`,
          format: "WebP",
          eager: {
            quality: "auto",
            transformation: { width: 500, height: 300 },
          },
          eager_async: true,
        }
      );
      const post = new Post({
        userId: req.user._id,
        profileImg: req.user.profileImage.imageUrl,
        username: req.user.username,
        imageUrl: imgResponse.eager[0].secure_url,
        description: req.body.story,
        likes: 0,
      });

      await post.save();
      res.json({
        status: "success",
        message: post,
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: "error",
        message: "error while uploaing image",
      });
    }
  }
);

postRouter.get("/getPosts", async (req, res) => {
  try {
    const posts = await Post.find({})
      .select([
        "userId",
        "profileImg",
        "username",
        "imageUrl",
        "description",
        "likes",
      ])
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort({ createAt: 1 });
    const numberOfDocuments = await Post.countDocuments();
    res.json({
      status: "success",
      message: posts,
      numberOfDocuments,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "loading error",
    });
  }
});

postRouter.get("/userPosts", authentication, async (req, res) => {
  try {
    const userPosts = await Post.find({ userId: req.user._id })
      .select([
        "userId",
        "profileImg",
        "username",
        "imageUrl",
        "description",
        "likes",
      ])
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit));
    if (userPosts.length === 0) {
      res.json({
        status: "error",
        message: "Cannot Find Any Post",
      });
    } else {
      const numberOfDocuments = await Post.find({
        userId: req.user._id,
      }).countDocuments();
      res.json({
        status: "success",
        message: userPosts,
        numberOfDocuments,
      });
    }
  } catch (err) {
    res.send(err);
  }
});

postRouter.post("/otherUserPost", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.body.id })
      .select([
        "userId",
        "profileImg",
        "username",
        "imageUrl",
        "description",
        "likes",
      ])
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit));
    if (posts.length === 0) {
      res.json({
        status: "error",
        message: "Cannot Find Any Post",
      });
    } else {
      const numberOfDocuments = await Post.find({
        userId: req.body.id,
      }).countDocuments();
      res.json({
        status: "success",
        message: posts,
        numberOfDocuments,
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: "cannot find any post",
    });
  }
});

postRouter.post("/addComment", authentication, async (req, res) => {
  try {
    const postData = await Post.findById(req.body.postId);
    postData.comments = [
      ...postData.comments,
      {
        userId: req.user._id,
        username: req.user.username,
        profileImage: req.user.profileImage.imageUrl,
        comment: req.body.comment,
      },
    ];
    await postData.save();
    res.json({
      status: "success",
    });
  } catch (err) {
    res.json({
      status: "error",
    });
  }
});

postRouter.post("/getComments", async (req, res) => {
  try {
    const postDetails = await Post.findById(req.body.postId);
    const allComments = postDetails.comments;
    const numberOfComments = allComments.length;
    const chosenComments = allComments.slice(req.body.start, req.body.end);

    res.json({
      status: "success",
      numberOfComments,
      comments: chosenComments,
    });
  } catch (err) {
    res.json({
      status: "error",
    });
  }
});

postRouter.post("/addLike", authentication, async (req, res) => {
  try {
    const postData = await Post.findById(req.body.postId);
    postData.likedPeople = [...postData.likedPeople, req.user._id];
    postData.likes = postData.likes + 1;
    await postData.save();
    res.json({
      status: "success",
    });
  } catch (err) {
    res.json({
      status: "error",
    });
  }
});

export default postRouter;
