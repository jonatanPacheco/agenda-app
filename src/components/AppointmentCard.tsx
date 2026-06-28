import { StyleSheet, Text, View } from "react-native";

interface AppointmentCardProps {
  key: string;
  providerId: string; // Relacionamento com o Prestador
  date: string; // Formato ISO (Ex: 2026-06-17T14:00:00.000Z)
  serviceName: string;
  // price: number;
  status: "pending" | "confirmed" | "cancelled";
}

export default function AppointmentCard({
  providerId,
  serviceName,
  date,
  status,
}: AppointmentCardProps) {
  const statusColor =
    status === "confirmed"
      ? "#2e7d32"
      : status === "cancelled"
        ? "#c62828"
        : "#FFBF00";

  return (
    <View style={styles.card}>
      <Text style={styles.cardItem}>{providerId}</Text>
      <Text style={styles.cardItem}>{serviceName}</Text>
      <Text style={styles.cardItem}>{date}</Text>
      <Text style={[styles.status, { color: statusColor }]}>
        Status: {status.toLocaleUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  cardItem: {
    width: "100%",
    borderRadius: 16,
    fontSize: 18,
  },

  status: {
    fontSize: 16,
  },
});
