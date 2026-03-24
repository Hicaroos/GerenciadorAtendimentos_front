import { Stack } from "expo-router";
import { LogBox } from 'react-native';

import { AuthProvider } from "@/contexts/authContext";

LogBox.ignoreAllLogs();

export default function Layout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="login"
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen
          name="register"
          options={{ title: "Register", headerShown: false }}
        />
        <Stack.Screen
          name="(protected)"
          options={{ title: "Dashboard", headerShown: false }}
        />
        <Stack.Screen
          name="+not-found"
          options={{ title: "Not Found", headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
}
