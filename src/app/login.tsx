import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { login } = useAuth();
  const params = useLocalSearchParams();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [tabSelected, setTabSelected] = useState<'STUDENT' | 'PROFESSOR'>('STUDENT');

  useEffect(() => {
    if (params.successMessage) {
      setSuccessMessage(params.successMessage as string);
      router.setParams({ successMessage: "" });
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
      const expectedRole = tabSelected === "PROFESSOR" ? "ROLE_TEACHER" as const : "ROLE_STUDENT" as const;
      await login(username, password, expectedRole);
    } catch (error: any) {
      setErrorMessage(error?.message || "Usuário ou senha incorretos.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={require('@/assets/sala-reunioes.jpg')}
          style={styles.leftImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.right}>
        <View style={styles.form}>
          <Text style={styles.login}>Login</Text>

          <View style={styles.switch_tab_buttons_container}>
            <Pressable 
            style={tabSelected === 'STUDENT' ? styles.selected_switch_tab_button : styles.unselected_switch_tab_button}
            onPress={() => setTabSelected('STUDENT')}
            >
              <Text style={tabSelected === 'STUDENT' ? styles.selected_switch_tab_button_text : styles.unselected_switch_tab_button_text}>
                Aluno
              </Text>
            </Pressable>     

            <Pressable 
            style={tabSelected === 'PROFESSOR' ? styles.selected_switch_tab_button : styles.unselected_switch_tab_button}
            onPress={() => setTabSelected('PROFESSOR')}
            >
              <Text style={tabSelected === 'PROFESSOR' ? styles.selected_switch_tab_button_text : styles.unselected_switch_tab_button_text}>
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
          </View>

          {!!successMessage && <Text style={styles.successText}>{successMessage}</Text>}

          {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          <Button fullWidth filled title="Entrar" onPress={handleLogin} />

          <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            <Text style={{ color: '#919191' }}>Não possui uma conta? </Text>
            <Link href="/register" asChild>
              <Text style={{ color: '#5561D7', fontWeight: 'bold' }}>
                Cadastre-se!
              </Text>
            </Link>
          </View>       
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
    backgroundColor: "#1a2744",
  },

  leftImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  right: {
    flex: 55,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "60%",
    gap: 24,
  },

  login: {
    color: "#5561D7",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
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
  },

  successText: {
    color: "#2ecc71",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
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
