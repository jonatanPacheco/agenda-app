import AppointmentCard from "@/src/components/AppointmentCard";
import { Button } from "@/src/components/Button";
import { useAppointments } from "@/src/contexts/AppointmentContext";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Appointments() {
  const router = useRouter();
  const {
    appointments,
    loading,
    user,
    toggleAppointmentStatus,
    deleteAppointment,
  } = useAppointments();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007aff" />
        <Text style={styles.loadingText}>Carregando agendamentos...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {user?.role === "admin"
            ? "Painel Administrativo"
            : "Meus Agendamentos"}
        </Text>
        {user?.role === "client" && (
          <Button
            title="+ Novo Agendamento"
            onPress={() => router.push("/new-appointment")}
          />
        )}
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
            id={item.id}
            providerId={item.providerId}
            serviceName={item.serviceName}
            date={item.date}
            status={item.status}
            userRole={user?.role || "client"}
            toggleAppointmentStatus={toggleAppointmentStatus}
            deleteAppointment={deleteAppointment}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },

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
