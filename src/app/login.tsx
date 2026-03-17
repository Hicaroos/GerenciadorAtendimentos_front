import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { login } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={require("@/assets/images/LogoUnifap.png")} resizeMode="contain" style={styles.image}/>
      </View>
      <View style={styles.right}>
        <View style={styles.form}>
          <Text style={styles.login}>Login</Text>
          <View style={styles.input}>
            <Input placeholder="Email" />
            <Input placeholder="Senha" secureTextEntry />
          </View>
          <Button title="Entrar" onPress={login} />
          <Link href={"/register"}>Não tem uma conta? Cadastre-se aqui.</Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  left: {
    backgroundColor: "#1A5987",
    borderRadius: 10,
    flex: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flex: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    gap: 80,
  },
  login: {
    color: "#1A5987",
    fontSize: 48,
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    gap: 40,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: 550,

  }
});
