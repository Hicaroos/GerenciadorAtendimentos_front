import { UserRole } from "./common";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type RegisterRequest = {
  username: string;
  password: string;
  role?: "ROLE_STUDENT" | "ROLE_TEACHER";
};

export type AuthStorageState = {
  accessToken: string;
  username: string;
  role: UserRole;
};
