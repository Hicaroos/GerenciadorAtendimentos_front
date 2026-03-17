import { router } from "expo-router";

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  isAuthenticated: boolean;
  isReady?: boolean;
  login: () => void;
  logout: () => void;
};

const AUTH_STORAGE_KEY = "@my-app:auth-state";

export const AuthContext = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  async function storageState(newState: boolean) {
    try {
      await AsyncStorage.setItem(
        AUTH_STORAGE_KEY,

        JSON.stringify({ newState }),
      );
    } catch (error) {
      console.error("ERROR_SET_STORAGE_AUTH:", error);
    }
  }

  function login() {
    setIsAuthenticated(true);
    storageState(true);
    router.replace("/(protected)/adminDashboard");
  }

  function logout() {
    setIsAuthenticated(false);

    storageState(false);

    router.replace("/login");
  }

  useEffect(() => {
    async function loadStorageState() {
      try {
        const storedState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        const state = storedState ? JSON.parse(storedState) : null;
        setIsAuthenticated(state?.newState ?? false);
      } catch (error) {
        console.error("ERROR_GET_STORAGE_AUTH:", error);
        setIsAuthenticated(false);
      } finally {
        setIsReady(true);
      }
    }

    loadStorageState();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}
