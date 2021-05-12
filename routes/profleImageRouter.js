import checkAccessToken from "../auth/accessAuth.js";
import express from "express";
import dotenv from "dotenv";
import clodenary from "cloudinary";
import multer from "multer";
import cloudenaryConf from "../module/cloudenaryConf.js";

dotenv.config();

const cloud = clodenary.v2;
const profileImageUpload = express.Router();
const upload = multer();

// setup cloudenary
cloudenaryConf(cloud);

profileImageUpload.post(
  "/signUpProfileUpload",
  upload.single("profile"),
  async (req, res) => {
    try {
      const buf = req.file.buffer.toString("base64");
      const response = await cloud.uploader.upload(
        `data:${req.file.mimetype};base64,` + buf,
        {
          folder: `viso/userProfile/`,
          format: "WebP",
          eager: {
            quality: "auto",
            transformation: { width: 200, height: 200 },
          },
          eager_async: true,
        }
      );
      res.json({
        status: "success",
        image: response.eager[0].secure_url,
        publicId: response.public_id,
        message: "image uploaded successfully",
      });
    } catch (err) {
      res.json({
        status: "error",
        message: "error while uploading image",
      });
    }
  }
);

export default profileImageUpload;
