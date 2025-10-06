import { Redis } from "@upstash/redis";

/**
 * RedisAdapter - Adaptador de cache usando Redis (Upstash)
 */
let redisClient = null;

const createRedisAdapter = () => {
	const REDIS_URL = process.env.REDIS_URL;
	const REDIS_TOKEN = process.env.REDIS_TOKEN;

	if (!REDIS_URL || !REDIS_TOKEN) {
		throw new Error("Redis configuration missing. Please set REDIS_URL and REDIS_TOKEN environment variables.");
	}

	if (!redisClient) {
		const connectionOpts = {
			url: REDIS_URL,
			token: REDIS_TOKEN,
		};
		redisClient = new Redis(connectionOpts);

		if (process.env.CACHE_DEBUG === "true") {
			console.log("[Redis Cache] Connected to Upstash Redis");
		}
	}
	return redisClient;
};

export default createRedisAdapter;
