import { useAppointments } from "@/src/contexts/AppointmentContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const { login } = useAppointments();

  const handleLogin = async (role: "client" | "admin") => {
    await login(role);
    router.replace("/(tabs)/appointments");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="calendar" size={60} color="#007aff" />
        </View>
        <Text style={styles.title}>Bem-vindo ao Agenda App</Text>
        <Text style={styles.subtitle}>
          Gerencie seus compromissos de forma simples e rápida.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.selectionText}>
          Escolha seu tipo de acesso para testar:
        </Text>
        <Pressable
          style={[styles.button, styles.clientButton]}
          onPress={() => handleLogin("client")}
        >
          <Ionicons name="person-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Entrar como Cliente</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.adminButton]}
          onPress={() => handleLogin("admin")}
        >
          <Ionicons name="briefcase-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Entrar como Administrador</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 24,
  },

  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
  },

  buttonContainer: {
    width: "100%",
    marginBottom: 40,
    gap: 16,
  },

  selectionText: {
    fontSize: 14,
    color: "#8e8e93",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "500",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  clientButton: {
    backgroundColor: "#007aff",
  },

  adminButton: {
    backgroundColor: "#34c759",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
