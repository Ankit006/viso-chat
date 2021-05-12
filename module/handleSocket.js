import redisClient from "./handleRedis.js";
import MessageStore from "./storeMessages.js";
import Notification from "./handleNotification.js";
import UserModel from "../model/UserModel.js";
import OpenChat from "./handleOpenChat.js";

function handleSocket(io) {
  const messageStore = new MessageStore(redisClient);
  const notification = new Notification(redisClient);
  const openChat = new OpenChat(redisClient);
  io.on("connection", (socket) => {
    console.log("a user is connected");

    //  save username for notification

    redisClient.hget("username", socket.userId, async (err, result) => {
      if (!result) {
        const user = await UserModel.findById(socket.userId);
        let userData = [user.username, user.profileImage.imageUrl];
        redisClient.hset("username", socket.userId, JSON.stringify(userData));
      }
    });

    //  save active user to redis set
    redisClient.sadd("active", socket.userId);

    // join custom id for private messaging
    socket.join(socket.userId);

    socket.to(socket.userId).emit("isUserActive", { message: "online" });

    // open personal chat page

    socket.on("openChat", (msg) => {
      openChat.openChat(msg.accountId);
      socket.join(msg.userId);
      redisClient.sismember("active", msg.userId, (err, active) => {
        if (active !== 0) {
          socket.emit("isUserActive", { message: "online" });
        } else {
          socket.emit("isUserActive", { message: "offline" });
        }
      });
    });

    socket.on("closeChat", (msg) => {
      openChat.closeChat(msg.accountId);
      socket.leave(msg.userId);
    });

    // send messages
    socket.on("sendMessage", (msg) => {
      redisClient.sismember("active", msg.to, (err, active) => {
        if (active !== 0) {
          redisClient.hget("openchat", msg.to, (err, result) => {
            if (result === "true") {
              socket.to(msg.to).emit("reciveMessage", {
                message: msg.message,
                from: msg.from,
              });
            } else {
              redisClient.hget("username", msg.from, (err, userDetails) => {
                let fromUser = JSON.parse(userDetails);
                socket.to(msg.to).emit("notification", {
                  id: msg.from,
                  profileImage: fromUser[1],
                  message: `${fromUser[0]} send you a new message`,
                });
              });
            }
          });
        } else {
          notification.saveMessageNotifiation(msg);
        }
      });
      messageStore.storeMessage(msg);
    });

    //  get all the old messages
    socket.on("getMessages", (msg) => {
      messageStore.getMessage(msg, socket);
    });

    //  handle follow event
    socket.on("follow", (msg) => {
      redisClient.sismember("active", msg.following, (err, active) => {
        if (active !== 0) {
          redisClient.hget("username", msg.follower, (err, userDetails) => {
            const followerUser = JSON.parse(userDetails);
            socket.to(msg.following).emit("notification", {
              id: msg.follower,
              profileImage: followerUser[1],
              message: `${followerUser[0]} is started to following you`,
            });
          });
        } else {
          notification.setFollowNotification(msg.following, msg.follower);
        }
      });
    });

    // handle notifications
    socket.on("notifications", (msg) => {
      notification.getNotification(socket, msg.accountId);
    });

    // delete all notification of current pocket user
    socket.on("delNotifications", (msg) => {
      notification.deleteNotification(msg.accountId);
    });

    // send offline signal
    socket.on("isUserActive", (msg) => {
      if (msg.status === "online") {
        socket.to(socket.userId).emit("isUserActive", { message: "online" });
      } else if (msg.status === "offline") {
        socket.to(socket.userId).emit("isUserActive", { message: "offline" });
      }
    });

    // disconnect handler
    socket.on("disconnect", () => {
      console.log("socket disconnect");
      socket.to(socket.userId).emit("isUserActive", { message: "offline" });
      redisClient.srem("active", socket.userId);
      socket.leave(socket.userId);
    });
  });
}

export default handleSocket;
