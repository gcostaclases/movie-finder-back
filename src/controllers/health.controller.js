/**
 * Health check endpoint
 * GET /health/ping
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @returns {void} Responde con "pong"
 */
export const getPing = (req, res) => {
	res.send("pong");
};
