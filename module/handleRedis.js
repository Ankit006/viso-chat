import redis from "redis";
const redisClient = redis.createClient(6379);

export default redisClient;
