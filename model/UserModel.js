import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
/**
 *  ----- build user schema ----------
 */
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    publicId: String,
    imageUrl: String,
  },
  follower: {
    type: Number,
    requred: true,
  },
  following: {
    type: Number,
    required: true,
  },
});

/**
 *  ------- hashed password before saving it to database --------
 */
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hasedPassword = await bcrypt.hash(this.password, 10);
    this.password = hasedPassword;
    next();
  }
});

/**
 *  ----- add method for validating user given password while login -----
 */

UserSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

/**
 *  ------ genarate access token ------
 */

UserSchema.methods.generateAccessToken = async function () {
  const accessToken = await jwt.sign(
    { _id: this._id },
    process.env.ACCESS_KEY,
    { expiresIn: "15m" }
  );

  return accessToken;
};

/**
 *  -------- genarate refresh token ------
 */

UserSchema.methods.generateRefreshToken = async function () {
  const refreshToken = await jwt.sign(
    { _id: this._id },
    process.env.REFRESH_KEY,
    { expiresIn: "7d" }
  );
  return refreshToken;
};

// create user model
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
