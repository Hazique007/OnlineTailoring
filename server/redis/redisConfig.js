// import redis from "redis";
// const client = redis.createClient({
//   url: "redis://localhost:6379",
// });

// client.on("connect", () => {
//   console.log("Connected to Redis");
// });

// client.on("error", (err) => {
//   console.error("Redis error:", err);
// });

// (async () => {
//   await client.connect();
// })();

// export default client;
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://evident-peacock-36436.upstash.io",
  token: "AY5UAAIjcDFlODRmMjMxODYzNjU0ODM5OGY0NWQ3MDcxM2Q1ZjE3ZnAxMA",
});
