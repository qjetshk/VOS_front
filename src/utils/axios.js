import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


let isRefreshing = false;
let failedRequests = [];

const refreshAccessToken = async () => {
  try {
    await api.post("/auth/refresh");
    return true;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequests.push(() => resolve(api(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        await refreshAccessToken();
        failedRequests.forEach((cb) => cb());
        failedRequests = [];
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = '/auth'
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
