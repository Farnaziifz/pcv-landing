import axios from "axios";

import { abortController, authToken, unAuthorized } from "./interceptors";

export const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: "http://10.30.64.14:8083/api/pcv/",
	timeout: 280000,
	headers: {
		Accept: "application/json ,text/plain, */*",
		"Content-Type": "application/json",
	},
});
axiosInstance.interceptors.request.use(authToken);
axiosInstance.interceptors.request.use(abortController);
axiosInstance.interceptors.response.use((res) => res, unAuthorized);
