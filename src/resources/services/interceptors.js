export const authToken = (config) => {
	const accessToken = localStorage.getItem("access_token");
	if (accessToken) {
		config.headers["Authorization"] = `Bearer ${accessToken}`;
	}
	return config;
};

export const abortController = (config) => {
	const controller = new AbortController();
	return {
		...config,
		signal: controller.signal,
		cancelExcute: controller.abort,
	};
};

export const unAuthorized = (error) => {
	if (error.response.status === 401) {
		localStorage.removeItem("access_token");
    window.location.reload()
	}
	return Promise.reject(error);
};
