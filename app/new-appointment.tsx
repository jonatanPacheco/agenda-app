import { useAppointments } from "@/src/contexts/AppointmentContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface FormData {
  providerId: string;
  serviceName: string;
  date: string;
}

export default function NewAppointment() {
  const router = useRouter();
  const { addAppointment } = useAppointments();

  const [formData, setFormData] = useState<FormData>({
    providerId: "",
    serviceName: "",
    date: "",
  });

  const handleChangeField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const { providerId, serviceName, date } = formData;

    if (!providerId.trim() || !serviceName.trim() || !date.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor preencha todos os campos antes de salvar.",
      );
      return;
    }

    try {
      await addAppointment({
        providerId: providerId.trim(),
        serviceName: serviceName.trim(),
        date: date.trim(),
      });

      Alert.alert("Sucesso!", "Seu agendamento foi cadastrado com sucesso.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Erro ao salvar o agendamento:", error);
      Alert.alert("Erro", "Não foi possível salvar o agendamento offline.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Solicitar Serviço</Text>
          <Text style={styles.subtitle}>
            Preencha os dados abaixo para criar um novo agendamento na
            plataforma
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Prestador de Serviço / Profissional</Text>
          <View style={styles.inputGroup}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#007aff"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: Dr. Silva, Barbearia do João..."
              placeholderTextColor="#999"
              value={formData.providerId}
              onChangeText={(text) => handleChangeField("providerId", text)}
            />
          </View>

          <Text style={styles.label}>Serviço Desejado</Text>
          <View style={styles.inputGroup}>
            <Ionicons
              name="cut-outline"
              size={20}
              color="#007aff"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: Consulta Geral, Corte de cabelo..."
              placeholderTextColor="#999"
              value={formData.serviceName}
              onChangeText={(text) => handleChangeField("serviceName", text)}
            />
          </View>

          <Text style={styles.label}>Data e Horário</Text>
          <View style={styles.inputGroup}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#007aff"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 15/07 às 14:00"
              placeholderTextColor="#999"
              value={formData.date}
              onChangeText={(text) => handleChangeField("date", text)}
            />
          </View>
        </View>

        <View style={styles.action}>
          <Pressable
            style={[styles.button, styles.saveButton]}
            onPress={() => handleSave}
          >
            <Ionicons name="checkmark-circle-outline" size={22} color="#fff" />
            <Text style={styles.saveButtonText}>Confirmar Agendamento</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Voltar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
    justifyContent: "center",
  },

  header: {
    marginBottom: 32,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },

  form: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
    marginTop: 12,
  },

  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 4,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: 48,
    color: "#333",
    fontSize: 15,
  },

  action: {
    gap: 12,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    gap: 8,
  },

  saveButton: {
    backgroundColor: "#007aff",
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  cancelButton: {
    backgroundColor: "transparent",
  },

  cancelButtonText: {
    color: "#666",
    fontSize: 15,
    fontWeight: "500",
  },
});
