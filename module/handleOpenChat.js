class OpenChat {
  constructor(redisClient) {
    this.redisClient = redisClient;
  }

  openChat(socketId) {
    this.redisClient.hset("openchat", socketId, "true");
  }

  closeChat(socketId) {
    this.redisClient.hset("openchat", socketId, "false");
  }
}

export default OpenChat;
