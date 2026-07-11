import { useAppointments } from "@/src/contexts/AppointmentContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const { user, logout, appointments } = useAppointments();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)");
  };

  const totalAgendamentos = appointments.length;
  const pendentes = appointments.filter((a) => a.status === "pending").length;
  const confirmados = appointments.filter(
    (a) => a.status === "confirmed",
  ).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <View
          style={[
            styles.avatarPlaceholder,
            { backgroundColor: user?.role === "admin" ? "#34c759" : "#007aff" },
          ]}
        >
          <Ionicons
            name={user?.role === "admin" ? "briefcase" : "person"}
            size={44}
            color="#fff"
          />
        </View>
        <Text style={styles.userName}>{user?.name || "Usuário"}</Text>
        <Text style={styles.userEmail}>{user?.email || "email@teste.com"}</Text>
        <View
          style={[
            styles.roleBadge,
            { backgroundColor: user?.role === "admin" ? "#e8f5e9" : "#e3f2fd" },
          ]}
        >
          <Text
            style={[
              styles.roleBadgeText,
              { color: user?.role === "admin" ? "#2e7d32" : "#1565c0" },
            ]}
          >
            {user?.role === "admin" ? "Conta Administrador" : "Conta Cliente"}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Resumo de atividades</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalAgendamentos}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: "#ffcc00" }]}>
            {pendentes}
          </Text>
          <Text style={styles.statLabel}>Pendentes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: "#34c759" }]}>
            {confirmados}
          </Text>
          <Text style={styles.statLabel}>Confirmados</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Opções de Conta</Text>
      <View style={styles.menuGroup}>
        {user?.role === "admin" ? (
          <>
            <Pressable style={styles.menuItem}>
              <Ionicons name="analytics-outline" size={22} color="#666" />
              <Text style={styles.menuItemText}>
                Relatórios de Serviços Prestados
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color="#ccc"
                style={styles.menuChevron}
              />
            </Pressable>
            <Pressable style={styles.menuItem}>
              <Ionicons name="chevron-forward" size={22} color="#666" />
              <Text style={styles.menuItemText}>
                Configurar Valores e Taxas
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color="#ccc"
                style={styles.menuChevron}
              />
            </Pressable>
          </>
        ) : (
          <>
            <Pressable style={styles.menuItem}>
              <Ionicons name="card-outline" size={22} color="#666" />
              <Text style={styles.menuItemText}>
                Formas de Pagamento Salvas
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color="#ccc"
                style={styles.menuChevron}
              />
            </Pressable>
            <Pressable style={styles.menuItem}>
              <Ionicons name="star-outline" size={22} color="#666" />
              <Text style={styles.menuItemText}>
                Meus Profissionais Favoritos
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color="#ccc"
                style={styles.menuChevron}
              />
            </Pressable>
          </>
        )}

        <Pressable style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={22} color="#666" />
          <Text style={styles.menuItemText}>Configurações de Notificações</Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color="#ccc"
            style={styles.menuChevron}
          />
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#ff3b30" />
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },

  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  userEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    marginBottom: 12,
  },

  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  roleBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 12,
    marginLeft: 4,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 12,
    marginBottom: 24,
  },

  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 1,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  statLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },

  menuGroup: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 32,
    elevation: 1,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  menuItemText: {
    fontSize: 15,
    color: "#333",
    marginLeft: 12,
    flex: 1,
  },

  menuChevron: {
    marginLeft: "auto",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff3b30",
    gap: 8,
    marginBottom: 20,
  },

  logoutButtonText: {
    color: "#ff3b30",
    fontSize: 16,
    fontWeight: "bold",
  },
});
