import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { View, Text, Button } from "react-native";

export default function Index() {
  const { logout, role } = useAuth();

  // if (role !== "admin") {
  //   return <Redirect href="/login" />;
  // }

  return (
    <View>
      <Text>Admin Dashboard</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  );
}
