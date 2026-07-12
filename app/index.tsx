import { useAppointments } from "@/src/contexts/AppointmentContext";
import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const { user, loading, checkAdminAccess } = useAppointments();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)" />;
  }
  if (checkAdminAccess(user)) {
    return <Redirect href="/(tabs)/appointments" />;
  }

  return <Redirect href="/(tabs)/appointments" />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
