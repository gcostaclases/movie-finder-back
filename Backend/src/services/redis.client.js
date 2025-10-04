import { Redis } from "@upstash/redis";

// Traigo las credenciales desde las variables de entorno
const { REDIS_URL, REDIS_TOKEN } = process.env;

let redisClient = null;

const connectToRedis = () => {
	if (!redisClient) {
		const connectionOptions = {
			url: REDIS_URL,
			token: REDIS_TOKEN,
		};

		redisClient = new Redis(connectionOptions);
	}
	return redisClient;
};

export default connectToRedis;
