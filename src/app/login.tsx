import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { login } = useAuth();
  const params = useLocalSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (params.successMessage) {
      setSuccessMessage(params.successMessage as string);
    }
  }, [params.successMessage]);

  const handleLogin = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!username || !password) {
      setErrorMessage("Por favor, preencha o nome e a senha.");
      return;
    }
    try {
      await login(username, password);
    } catch (error) {
      setErrorMessage("Usuário ou senha incorretos.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={require("@/assets/images/LogoUnifap.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.right}>
        <View style={styles.form}>
          <Text style={styles.login}>Login</Text>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Nome de usuário"
              value={username}
              onChangeText={setUsername}
            />

            <Input
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {successMessage ? (
            <Text style={styles.successText}>{successMessage}</Text>
          ) : null}

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <Button fullWidth filled title="Entrar" onPress={handleLogin} />

          <Link href={"/register"} style={styles.linkText}>
            Não tem uma conta? Cadastre-se aqui.
          </Link>
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
    width: "60%",
    gap: 30,
    alignItems: "center",
  },
  login: {
    color: "#1A5987",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    gap: 20,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: 550,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -10,
  },
  successText: {
    color: "#2ecc71",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -10,
  },
  linkText: {
    marginTop: 10,
  },
});
