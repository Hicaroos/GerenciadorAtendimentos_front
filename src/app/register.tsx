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
          source={require('@/assets/images/academicLogo.svg')}
          style={{ width: 500, height: 500 }}
          resizeMode="contain" 
        />
      </View>

      <View style={styles.right}>
        <View style={styles.form}>
          <Text style={styles.title}>
            Cadastro
          </Text>

          <View style={styles.inputContainer}>
            <Input
              hasLabel
              label="Nome"
              bgTransparent
              value={username}
              onChangeText={setUsername}
            />

            <Input
              hasLabel
              bgTransparent
              label="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Input
              hasLabel
              bgTransparent
              label="Confirmar senha"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {!!message && <Text style={styles.errorText}>{message}</Text>}

          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            <Text style={{ color: '#919191' }}>Já possui conta? </Text>
            <Link href="/login" asChild>
              <Text style={{ color: '#5561D7', fontWeight: 'bold' }}>
                Entre!
              </Text>
            </Link>
          </View>  

          <Button fullWidth filled title="Cadastrar" onPress={handleRegister} />
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
  },

  left: {
    backgroundColor: "#5561D7",
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
    gap: 20,
  },

  title: {
    color: "#5561D7",
    fontSize: 48,
    fontWeight: "bold",
    alignSelf: 'center',
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
});
