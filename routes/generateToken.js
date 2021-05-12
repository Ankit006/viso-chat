import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const router = express.Router();

/**
 *  generate new accesstoken
 *  1 . in every 13min client call this router
 *  2. first check if refreshToken cookie exist or not
 *  3. then veriy it and generate new accessToken and refreshToken
 *  4. send new accessToken to client and set new refreshToken to cookie
 */

router.get("/getAccessToken", async (req, res) => {
  try {
    const refreshToken = req.cookies.rf;
    if (!refreshToken) return res.json({ status: "Unauthorized" }); // check if refreshToken exist or not
    const payload = await jwt.verify(refreshToken, process.env.REFRESH_KEY);

    // generate new accessToken and refresh Token

    const newAccessToken = await jwt.sign(
      { _id: payload._id },
      process.env.ACCESS_KEY,
      { expiresIn: "15m" }
    );
    const newRefreshKey = await jwt.sign(
      { _id: payload._id },
      process.env.REFRESH_KEY,
      { expiresIn: "7d" }
    );

    //  set new refresh Token to cookie and send new access token to client
    res.cookie("rf", newRefreshKey, {
      sameSite: "lax",
      httpOnly: true,
      maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      secure: true,
    });
    res.json({
      status: "success",
      accessToken: newAccessToken,
    });
  } catch (err) {
    res.json({
      status: "Unauthorized",
    });
  }
});

export default router;
