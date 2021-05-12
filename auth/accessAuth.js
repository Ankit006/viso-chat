import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../model/UserModel.js";

dotenv.config();
/**
 *   this is a middleware to verify jsonwebtoken
 *  1. first we get the authorization header data and check if authorization header exist or not
 *  2. if authorization header not exist then send unauthorized error message
 *  3 now split the Bearer and token and check if token available or not
 *  4 . if token is not available then send unauthorized message
 * 5 . varify jsonwebtoken
 * 6. find user data using payload and check if user exist
 * 7.  if user is not exist then send unauthorized message
 * 8. (optional) save user data to req.user property
 */

const checkAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]; // get the authotization header data
    if (!authHeader) return res.json({ status: "Unauthorize" }); // check if authorization header exist
    const accessToken = authHeader.split(" ")[1]; // get token
    if (!accessToken) return res.json({ status: "Unauthorized" }); // check if token exist
    const payload = await jwt.verify(accessToken, process.env.ACCESS_KEY); // verify jwt token
    const user = await UserModel.findById(payload._id); // find user account
    if (!user) return res.json({ status: "Unauthorized" }); // check if account is exist or not
    req.user = user; // set the user data in req.user property
    next();
  } catch (err) {
    res.json({
      status: "Unauthorized",
    });
  }
};

export default checkAccessToken;
