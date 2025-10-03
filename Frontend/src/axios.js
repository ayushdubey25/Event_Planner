import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5800/api", // your backend port
});

// Attach token automatically
instance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default instance;
