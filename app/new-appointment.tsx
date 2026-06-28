import { Button } from "@/src/components/Button";
import { useAppointments } from "@/src/contexts/AppointmentContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

export default function NewAppointment() {
  const router = useRouter();
  const { addAppointment } = useAppointments();

  const [providerId, setProviderId] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [date, setDate] = useState("");

  const handleSave = () => {
    console.log("Botão clicado! useAppointments é:", addAppointment);
    Alert.alert("Debug", `addAppointment existe? ${typeof addAppointment}`);
    if (!providerId || !serviceName || !date) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    addAppointment({ providerId, serviceName, date });

    Alert.alert("Sucesso", "Agendamento realizado!");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Prestador de Serviço:</Text>
      <TextInput
        style={styles.input}
        value={providerId}
        onChangeText={setProviderId}
        placeholder="Ex: Dr. Alex Silva"
      />

      <Text style={styles.label}>Serviço:</Text>
      <TextInput
        style={styles.input}
        value={serviceName}
        onChangeText={setServiceName}
        placeholder="Ex: Consulta Geral"
      />

      <Text style={styles.label}>Data e Horário:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Ex: 17/06/2026 às 14:00"
      />

      <Button title="Confirmar Agendamento" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },

  button: {
    borderRadius: 20,
    backgroundColor: "#4274D9",
    padding: 8,
  },
});
