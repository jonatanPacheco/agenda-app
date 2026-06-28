import { Button } from "@/src/components/Button";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(tabs)/appointments");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Agenda App</Text>
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  button: {
    borderRadius: 20,
    backgroundColor: "#4274D9",
    padding: 8,
  },

  btnText: {
    fontSize: 18,
    textAlign: "center",
  },
});
