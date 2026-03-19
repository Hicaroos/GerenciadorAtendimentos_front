import { router } from "expo-router";

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/services/api";

type AuthState = {
  isAuthenticated : boolean;
  isReady?        : boolean;
  login           : (email: string, password: string) => Promise<void>;
  logout          : () => void;
  role            : "admin" | "user" | null;
};

const AUTH_STORAGE_KEY = "@my-app:auth-state";

export const AuthContext = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [role, setRole]       = useState<AuthState['role']>(null);

  // async function login(email: string, password: string) {
  //   try {
  //     const response = await api.post("/login", { email, password });
  //     const { token, role: userRole } = response.data;
  //     const authState = JSON.stringify({ token, role: userRole });

  //     await AsyncStorage.setItem(AUTH_STORAGE_KEY, authState);

  //     setIsAuthenticated(true);
  //     setRole(userRole);
  //     if (userRole === "admin") {
  //       router.replace("/(protected)/adminDashboard");
  //     } else {
  //       router.replace("/(protected)/userDashboard");
  //     }
  //   } catch (error) {
  //     console.error("Erro na API de login:", error);
  //     throw error;
  //   }
  // }

  // ######################################### MOCK LOGIN PARA TESTES ############################################
  async function login(email: string, password: string) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      let mockResponse;

      if (email === "admin@teste.com" && password === "123456") {
        mockResponse = {
          data: {
            token : "fake-jwt-token-admin-123",
            role  : "admin",
          },
        };
      } else if (email === "user@teste.com" && password === "123456") {
        mockResponse = {
          data: {
            token : "fake-jwt-token-user-456",
            role  : "user",
          },
        };
      } else {
        throw new Error("Credenciais inválidas");
      }

      const { token, role: userRole } = mockResponse.data;
      const authState = JSON.stringify({ token, role: userRole });

      await AsyncStorage.setItem(AUTH_STORAGE_KEY, authState);
      setIsAuthenticated(true);
      setRole(userRole as "admin" | "user");

      if (userRole === "admin") {
        router.replace("/(protected)/adminDashboard");
      } else {
        router.replace("/(protected)/userDashboard");
      }
    } catch (error) {
      console.error("Erro na API de login:", error);
      throw error;
    }
  }
  // ######################################### MOCK LOGIN PARA TESTES ############################################
  function logout() {
    setIsAuthenticated(false);
    setRole(null);
    AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    router.replace("/login");
  }
  useEffect(() => {
    async function loadStorageState() {
      try {
        const storedState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        const state = storedState ? JSON.parse(storedState) : null;

        if (state?.token && state?.role) {
          setIsAuthenticated(true);
          setRole(state.role);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsReady(true);
      }
    }

    loadStorageState();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, isReady, role }}
    >
      {children}
    </AuthContext.Provider>
  );
}
