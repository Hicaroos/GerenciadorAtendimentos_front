import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Link, router } from "expo-router";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/services/api";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const handleRegister = async() => {
    setMessage("");

    if (!username || !password || !confirmPassword) {
      setMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    try {
      await api.post("/auth/register", {
        username,
        password,
      });

      router.replace({
        pathname: "/login",
        params: { successMessage: "Conta criada com sucesso! Faça seu login." },
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Não foi possível criar a conta. Tente novamente.";
      setMessage(errorMessage);
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
          <Text style={styles.title}>Cadastro</Text>

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

            <Input
              placeholder="Confirmar Senha"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {message ? <Text style={styles.errorText}>{message}</Text> : null}

          <Button fullWidth filled title="Cadastrar" onPress={handleRegister} />

          <Link href={"/login"} style={styles.linkText}>
            Já tem uma conta? Voltar para o Login.
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
  title: {
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
  linkText: {
    marginTop: 10,
  },
});
