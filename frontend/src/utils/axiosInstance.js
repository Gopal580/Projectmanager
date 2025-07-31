import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { BACKEND_URL } from "./backendurl";
const baseURL = `${BACKEND_URL}`; // Change if needed

const useAxios = () => {
  const { accessToken, setAccessToken } = useAuth();

  const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, // very important to send cookies
  });

  // Request interc eptor
  axiosInstance.interceptors.request.use((config) => {
    
    if (accessToken) {

      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  });

  // Response interceptor for refresh
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err.response?.status === 403) {
        try {
          const response = await axios.post(
            `${baseURL}/auth/refresh`,
            {},
            { withCredentials: true }
          );
          
          setAccessToken(response.data.accessToken);

          err.config.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
          return axiosInstance(err.config); // retry original request
        } catch (refreshError) {
          console.log("Refresh token invalid",refreshError);
        }
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export default useAxios;
