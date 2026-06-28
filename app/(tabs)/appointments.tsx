import AppointmentCard from "@/src/components/AppointmentCard";
import { Button } from "@/src/components/Button";
import { useAppointments } from "@/src/contexts/AppointmentContext";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Appointments() {
  const router = useRouter();
  const { appointments } = useAppointments();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Agendamentos</Text>
        <Button
          title="+ Novo Agendamento"
          onPress={() => router.push("/new-appointment")}
        />
      </View>

      {appointments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Você ainda não possui agendamentos cadastrados.
          </Text>
        </View>
      ) : (
        appointments.map((item) => (
          <AppointmentCard
            key={item.id}
            providerId={item.providerId}
            serviceName={item.serviceName}
            date={item.date}
            status={item.status}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    minHeight: "100%",
  },

  header: {
    marginBottom: 20,
    width: "100%",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },

  emptyContainer: {
    flex: 1,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
