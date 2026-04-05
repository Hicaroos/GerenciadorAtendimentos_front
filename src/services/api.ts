import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_STORAGE_KEY } from "@/constants/auth";
import { AuthStorageState } from "@/types/auth";
import { normalizeHttpError } from "@/utils/httpError";

function getApiBaseUrl(): string {
  const envBaseUrl =
    process.env.EXPO_PUBLIC_API_BASE_URL ||
    process.env.EXPO_PUBLIC_API_URL;

  if (envBaseUrl) return envBaseUrl;
  return "http://localhost:8080";
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
});

api.interceptors.request.use(async (config) => {
  const storedState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

  if (storedState) {
    const { accessToken } = JSON.parse(storedState) as AuthStorageState;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      const storedState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (storedState) {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:unauthorized"));
      }
    }

    return Promise.reject(normalizeHttpError(error));
  },
);
