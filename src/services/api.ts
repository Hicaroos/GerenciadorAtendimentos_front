import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_STORAGE_KEY = "@my-app:auth-state";

export const api = axios.create({
  baseURL: "", //adicionar porta api depois
});

api.interceptors.request.use(async (config) => {
  const storedState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
  if (storedState) {
    const { token } = JSON.parse(storedState);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
