import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/hooks/useAuth";
import { ActivityIndicator } from "react-native";

export default function ProtectedLayout() {
  const { isAuthenticated, isReady } = useAuth();
  if (!isReady) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  if (!isAuthenticated) {
    return <Redirect href={"/login"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="userDashboard"
        options={{ 
          headerBackVisible : false, 
          headerShown       : false, 
        }}
      />
      <Stack.Screen
        name="adminDashboard"
        options={{ 
          headerBackVisible : false, 
          headerShown       : false, 
        }}
      />
    </Stack>
  );
}
