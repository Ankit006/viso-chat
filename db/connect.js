import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("connect to db 👍");
  } catch (err) {
    console.log("cannot connect to db 🚨");
    process.exit(1);
  }
};

export default databaseConnect;
