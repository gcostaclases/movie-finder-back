import { makeRequest } from "../axios";

export const login = async (identifier, password) => {
	return await makeRequest({
		method: "POST",
		url: "/auth/login",
		data: { identifier, password },
	});
};
