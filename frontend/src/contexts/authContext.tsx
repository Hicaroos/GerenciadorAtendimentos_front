import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/services/api";

type AuthState = {
  isAuthenticated: boolean;
  isReady?: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  
  username: string | null;
  role: "ROLE_TEACHER" | "ROLE_STUDENT" | null;
};

const AUTH_STORAGE_KEY = "@my-app:auth-state";

export const AuthContext = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<AuthState["role"]>(null);

  async function login(username: string, password: string) {
    try {
      const response = await api.post("/auth/login", { 
        username, 
        password 
      });

      const { accessToken } = response.data;

      const decodedToken: any = jwtDecode(accessToken);

      console.log(decodedToken);

      const userRole = decodedToken.scope?.includes("ROLE_TEACHER")
        ? "ROLE_TEACHER"
        : "ROLE_STUDENT";

      const usernameFromToken = decodedToken.sub;

      const authState = JSON.stringify({ 
        accessToken, 
        role     : userRole,
        username : usernameFromToken, 
      });

      console.log(authState);

      await AsyncStorage.setItem(
        AUTH_STORAGE_KEY, 
        authState
      );

      setUsername(usernameFromToken);
      setIsAuthenticated(true);
      setRole(userRole);

      if (userRole === "ROLE_TEACHER") {
        router.replace("/(protected)/adminDashboard");
      } else {
        router.replace("/(protected)/userDashboard");
      }  
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  }

  function logout() {
    setIsAuthenticated(false);
    setRole(null);
    setUsername(null);
    AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    router.replace("/login");
  }

  useEffect(() => {
    async function loadStorageState() {
      try {
        const storedState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        const state = storedState ? JSON.parse(storedState) : null;

        if (state?.accessToken && state?.role) {
          setIsAuthenticated(true);
          setRole(state.role);
          setUsername(state.username);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error:any) {
        console.error(error);
        setIsAuthenticated(false);
      } finally {
        setIsReady(true);
      }
    }

    loadStorageState();
  }, []);

  return (
    <AuthContext.Provider
    value={{ 
      role, 
      isReady, 
      username,
      isAuthenticated, 
      logout, 
      login, 
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
