class Notification {
  constructor(redisClient) {
    this.redisClient = redisClient;
  }

  //   save notification of messages into redis hash (just saving the sender id)

  saveMessageNotifiation(msg) {
    this.redisClient.hget("username", msg.from, (err, userDetails) => {
      if (userDetails) {
        let user = JSON.parse(userDetails);
        this.redisClient.hget("notification", msg.to, (err, result) => {
          if (!result) {
            const notification = [];
            notification.push({
              id: msg.from,
              profileImage: user[1],
              message: `${user[0]} send you a new sms`,
            });
            this.redisClient.hset(
              "notification",
              msg.to,
              JSON.stringify(notification)
            );
          } else {
            let allNotifications = JSON.parse(result);
            allNotifications.push({
              id: msg.from,
              profileImage: user[1],
              message: `${user[0]} send you a new sms`,
            });
            this.redisClient.hset(
              "notification",
              msg.to,
              JSON.stringify(allNotifications)
            );
          }
        });
      }
    });
  }

  // save Follow notification

  setFollowNotification(followingId, followerId) {
    console.log("notification saved");
    this.redisClient.hget("username", followerId, (err, userDetails) => {
      if (userDetails) {
        let user = JSON.parse(userDetails);
        this.redisClient.hget("notification", followingId, (err, result) => {
          if (!result) {
            let newNotificaiton = [];
            newNotificaiton.push({
              id: followerId,
              profileImage: user[1],
              message: `${user[0]} is started following you`,
            });
            this.redisClient.hset(
              "notification",
              followingId,
              JSON.stringify(newNotificaiton)
            );
          } else {
            let allNotifications = JSON.parse(result);
            allNotifications.push({
              id: followerId,
              profileImage: user[1],
              message: `${user[0]} is started following you`,
            });
            this.redisClient.hset(
              "notification",
              followingId,
              JSON.stringify(allNotifications)
            );
          }
        });
      }
    });
  }

  getNotification(socket, socketId) {
    this.redisClient.hget("notification", socketId, (err, result) => {
      if (result) {
        socket.emit("notifications", JSON.parse(result));
      } else {
        socket.emit("notifications", []);
      }
    });
  }

  deleteNotification(socketId) {
    this.redisClient.hdel("notification", socketId);
  }

  isActiveUser(socketId) {
    socket.to(socketId).emit("isUserActive", { message: "offline" });
  }
}

export default Notification;
