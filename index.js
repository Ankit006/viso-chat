import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
import https from "https";
import { Server } from "socket.io";
import databaseConnect from "./db/connect.js";
import handleSocket from "./module/handleSocket.js";
import http from "http";

const app = express();
const server = http.createServer(app);
// const privateKey = fs.readFileSync("./secure/key.pem", "utf-8");
// const certificate = fs.readFileSync("./secure/cert.pem", "utf-8");
// const credantials = { key: privateKey, cert: certificate };
const io = new Server(server);

/**
 *     ------- import routers -------
 *
 */
import accountRouter from "./routes/accountRouter.js";
import getAccessToken from "./routes/generateToken.js";
import profileImageUpload from "./routes/profleImageRouter.js";
import post from "./routes/post.js";

/**
 *      ------ middlewares ------
 */

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", accountRouter, getAccessToken, profileImageUpload, post);

app.use(express.static("build"));

/**
 *  ----- connect to database
 */

databaseConnect();

io.use((socket, next) => {
  socket.userId = socket.handshake.auth.accountId;
  next();
});

handleSocket(io);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`server is up and running on port ${port} 😊😊`);
});
