import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { View, Text, Button } from "react-native";

export default function Index() {
  const { logout, role } = useAuth();

  return (
    <View>
      <Text>User Dashboard</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  );
}
