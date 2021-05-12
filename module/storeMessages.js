import redisClient from "./handleRedis.js";
import MessageModel from "../model/message.js";
class StoreMessages {
  constructor() {
    this.store = {};
  }

  saveMessage(msg) {
    if (this.store[msg.from]) {
      if (this.store[msg.from][msg.to]) {
        this.store[msg.from][msg.to].push(msg.message);
      } else {
        this.store[msg.from][msg.to] = [];
        this.store[msg.from][msg.to].push(msg.message);
      }
    } else {
      this.store[msg.from] = {};
      this.store[msg.from][msg.to] = [];
      this.store[msg.from][msg.to].push(msg.message);
    }
  }

  getMessage(msg) {
    return this.store[msg.from][msg.to];
  }
}

class MessageStore {
  constructor(redisClient) {
    this.redisClient = redisClient;
  }

  storeMessage(msg) {
    this.redisClient.hget(msg.from, msg.to, (err, result) => {
      if (!result) {
        let messages = [];
        messages.push({ messages: msg.message, id: msg.from });

        this.redisClient.hset(
          msg.from,
          msg.to,
          JSON.stringify(messages),
          (err) => {
            if (err) console.log(err);
          }
        );
      } else {
        let messagesData = JSON.parse(result);
        messagesData.push({ messages: msg.message, id: msg.from });
        this.redisClient.hset(
          msg.from,
          msg.to,
          JSON.stringify(messagesData),
          (err) => {
            if (err) console.log(err);
          }
        );
      }
    });

    this.redisClient.hget(msg.to, msg.from, (err, result) => {
      if (!result) {
        let messages = [];
        messages.push({ messages: msg.message, id: msg.from });

        this.redisClient.hset(
          msg.to,
          msg.from,
          JSON.stringify(messages),
          (err) => {
            if (err) console.log(err);
          }
        );
      } else {
        let messagesData = JSON.parse(result);
        messagesData.push({ messages: msg.message, id: msg.from });
        this.redisClient.hset(
          msg.to,
          msg.from,
          JSON.stringify(messagesData),
          (err) => {
            if (err) console.log(err);
          }
        );
      }
    });
  }

  getMessage(msg, socket) {
    redisClient.hget(msg.from, msg.to, (err, messages) => {
      if (messages) {
        socket.emit("getMessages", JSON.parse(messages));
      }
    });
  }

  storeMessagesToDatabase(socketId) {
    redisClient.hgetall(socketId, (err, result) => {
      console.log(result);
    });
  }
}

export default MessageStore;
