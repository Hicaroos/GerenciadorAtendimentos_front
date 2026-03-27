import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_STORAGE_KEY } from "@/constants/auth";
import { authService } from "@/services/authService";
import { AuthStorageState } from "@/types/auth";
import { UserRole } from "@/types/common";

type AuthState = {
  isAuthenticated: boolean;
  isReady?: boolean;
  login: (username: string, password: string, expectedRole?: UserRole) => Promise<void>;
  logout: () => void;
  
  username: string | null;
  role: UserRole | null;
};

export const AuthContext = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<AuthState["role"]>(null);

  async function login(username: string, password: string, expectedRole?: UserRole) {
    try {
      const response = await authService.login({ 
        username, 
        password 
      });

      const { accessToken } = response;

      const decodedToken: any = jwtDecode(accessToken);

      const userRole: UserRole = decodedToken.scope?.includes("ROLE_TEACHER")
        ? "ROLE_TEACHER"
        : "ROLE_STUDENT";

      if (expectedRole && userRole !== expectedRole) {
        const label = expectedRole === "ROLE_TEACHER" ? "professor" : "aluno";
        throw new Error(`Essa conta não é de ${label}.`);
      }

      const usernameFromToken = decodedToken.sub;

      const authState: AuthStorageState = { 
        accessToken, 
        role     : userRole,
        username : usernameFromToken, 
      };

      await AsyncStorage.setItem(
        AUTH_STORAGE_KEY, 
        JSON.stringify(authState)
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
        const state = storedState ? (JSON.parse(storedState) as AuthStorageState) : null;

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

  useEffect(() => {
    const onUnauthorized = () => {
      setIsAuthenticated(false);
      setRole(null);
      setUsername(null);
      router.replace("/login");
    };

    if (typeof window !== "undefined") {
      window.addEventListener("auth:unauthorized", onUnauthorized);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("auth:unauthorized", onUnauthorized);
      }
    };
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
