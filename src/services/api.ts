import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_STORAGE_KEY = "@my-app:auth-state";

export const api = axios.create({
  baseURL: "http://localhost:8080", 
});

api.interceptors.request.use(async (config) => {
  const storedState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
  if (storedState) {
    const { accessToken } = JSON.parse(storedState);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});
