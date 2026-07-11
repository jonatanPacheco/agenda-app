import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Appointment } from "../contexts/AppointmentContext";

interface AppointmentCardProps {
  id: string;
  providerId: string;
  date: string;
  serviceName: string;
  status: Appointment["status"];
  userRole: "client" | "admin";
  toggleAppointmentStatus: (id: string) => void;
  deleteAppointment: (id: string) => void;
}

export default function AppointmentCard({
  id,
  providerId,
  serviceName,
  date,
  status,
  userRole,
  toggleAppointmentStatus,
  deleteAppointment,
}: AppointmentCardProps) {
  const statusColors = {
    pending: "#ffcc00",
    confirmed: "#34c759",
    cancelled: "#ff3b30",
  };

  const statusLabels = {
    pending: "Pendente",
    confirmed: "Confirmado",
    cancelled: "Cancelado",
  };

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.provider}>{providerId}</Text>
        <Text style={styles.service}>{serviceName}</Text>
        <Text style={styles.date}>{date}</Text>

        <View
          style={[styles.statusTag, { backgroundColor: statusColors[status] }]}
        >
          <Text style={styles.statusText}>{statusLabels[status]}</Text>
        </View>
      </View>

      {userRole === "admin" && (
        <View style={styles.actionsContainer}>
          <Pressable
            style={styles.statusButton}
            onPress={() => toggleAppointmentStatus(id)}
          >
            <Ionicons name="refresh-circle-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Status</Text>
          </Pressable>
          <Pressable
            style={styles.deleteButton}
            onPress={() => deleteAppointment(id)}
          >
            <Ionicons name="trash-outline" size={16} color="#fff" />
            <Text style={styles.buttonText}>Excluir</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  infoContainer: {
    flex: 1,
  },

  provider: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  service: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  date: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },

  statusTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 8,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  actionsContainer: {
    alignItems: "flex-end",
    gap: 8,
  },

  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#007aff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#ff3b30",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
