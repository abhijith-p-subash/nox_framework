import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("ready", () => {
  console.log("\x1b[32m","Client connected to redis and redy to use...");
});

redisClient.on("end", () => {
  console.log("Client disconnected from redis");
});

process.on("SIGINT", () => {
  redisClient.quit();
});

redisClient.on("error", (err) => {
  console.log("Redis client Error", err);
});

export default redisClient;
