import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // remove if your backend returns a JWT in the body instead of a cookie
});

// Attach the access token if you keep a JWT in memory
api.interceptors.request.use((config) => {
  // const token = useAuthStore.getState().token;
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401s (refresh token flow goes here)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      // TODO: call the refresh endpoint once and retry the original request,
      // or log the user out if the refresh fails
    }
    return Promise.reject(error);
  }
);

export default api;
