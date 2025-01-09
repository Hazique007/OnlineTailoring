import redis from "redis";
const client = redis.createClient({
  url: "redis://localhost:6379",
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

(async () => {
  await client.connect();
})();

export default client;
