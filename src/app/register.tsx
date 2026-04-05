import { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Link, router } from "expo-router";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { authService } from "@/services/authService";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [roleSelected, setRoleSelected] = useState<"STUDENT" | "PROFESSOR">("STUDENT");

  const [message, setMessage] = useState<string>("");

  const handleRegister = async() => {
    setMessage("");

    if (!username || !password || !confirmPassword) {
      setMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (username.trim().length < 4) {
      setMessage("O nome deve ter no mínimo 4 caracteres.");
      return;
    }

    if (password.length < 6) {
      setMessage("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    try {
      await authService.register({
        username,
        password,
        ...(roleSelected === "PROFESSOR" && { role: "ROLE_TEACHER" }),
      });

      router.replace({
        pathname: "/login",
        params: { successMessage: "Conta criada com sucesso! Faça seu login." },
      });
    } catch (error: any) {
      const errorMessage = error?.message || "Não foi possível criar a conta. Tente novamente.";
      setMessage(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={require('@/assets/images/academicLogo.svg')}
          style={styles.leftImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.right}>
        <View style={styles.form}>
          <Text style={styles.title}>
            Cadastro
          </Text>

          <View style={styles.switch_tab_buttons_container}>
            <Pressable 
            style={roleSelected === 'STUDENT' ? styles.selected_switch_tab_button : styles.unselected_switch_tab_button}
            onPress={() => setRoleSelected('STUDENT')}
            >
              <Text style={roleSelected === 'STUDENT' ? styles.selected_switch_tab_button_text : styles.unselected_switch_tab_button_text}>
                Aluno
              </Text>
            </Pressable>     

            <Pressable 
            style={roleSelected === 'PROFESSOR' ? styles.selected_switch_tab_button : styles.unselected_switch_tab_button}
            onPress={() => setRoleSelected('PROFESSOR')}
            >
              <Text style={roleSelected === 'PROFESSOR' ? styles.selected_switch_tab_button_text : styles.unselected_switch_tab_button_text}>
                Professor
              </Text>
            </Pressable>      
          </View>

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
    flex: 45,
    overflow: "hidden",
    backgroundColor: "#5562d754",
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftImage: {
    width: "50%",
    height: "50%",
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

  role_selector_container: {
    gap: 10,
  },

  role_selector_label: {
    color: "#5561D7",
    fontWeight: "bold",
    fontSize: 16,
  },

  role_options_row: {
    flexDirection: "row",
    gap: 32,
  },

  role_option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  role_option_text: {
    fontSize: 16,
    color: "#656565",
  },

  role_option_text_selected: {
    color: "#5561D7",
    fontWeight: "bold",
  },

  radio_outer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#656565",
    alignItems: "center",
    justifyContent: "center",
  },

  radio_outer_selected: {
    borderColor: "#5561D7",
  },

  radio_inner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5561D7",
  },

  switch_tab_buttons_container: {
    flexDirection: 'row',
  },

  unselected_switch_tab_button: {
    borderBottomWidth: 1,
    borderBottomColor: '#656565',
    padding: 20,
    flex: 1,
  },

  unselected_switch_tab_button_text: {
    fontWeight: 'bold',
    color: '#656565',
    fontSize: 16,
    textAlign: 'center',
  },

  selected_switch_tab_button: {
    borderBottomWidth: 4,
    borderBottomColor: '#5561D7',
    padding: 20,
    flex: 1,
  },

  selected_switch_tab_button_text: {
    fontWeight: 'bold',
    color: '#5561D7',
    fontSize: 16,
    textAlign: 'center',
  },
});
