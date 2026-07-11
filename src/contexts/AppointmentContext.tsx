import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "admin";
}

export interface Appointment {
  id: string;
  clientId: string;
  providerId: string;
  serviceName: string;
  date: string;
  status: "pending" | "confirmed" | "cancelled";
}

interface AppoitmentContextData {
  appointments: Appointment[];
  user: User | null;
  loading: boolean;
  login: (role: "client" | "admin") => void;
  logout: () => void;
  addAppointment: (
    appointment: Omit<Appointment, "id" | "status" | "clientId">,
  ) => void;
  toggleAppointmentStatus: (id: string) => void;
  deleteAppointment: (id: string) => void;
}

const AppointmentContext = createContext<AppoitmentContextData>(
  {} as AppoitmentContextData,
);

const APPOINTMENTS_KEY = "@app_agendamentos:appointments";
const USER_KEY = "@app_agendamentos:user";

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredData() {
      try {
        const [storedUser, storedAppointments] = await Promise.all([
          AsyncStorage.getItem(USER_KEY),
          AsyncStorage.getItem(APPOINTMENTS_KEY),
        ]);

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        if (storedAppointments) {
          setAppointments(JSON.parse(storedAppointments));
        }
      } catch (error) {
        console.error(
          "Erro ao carregar dados do armazenamento offline:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }
    loadStoredData();
  }, []);

  const login = async (role: "client" | "admin") => {
    const mockUser: User =
      role === "admin"
        ? {
            id: "admin_1",
            name: "Admin Geral",
            email: "admin@business.com",
            role: "admin",
          }
        : {
            id: "client_1",
            name: "Jonatan",
            email: "jonatan@teste.com",
            role: "client",
          };

    setUser(mockUser);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(mockUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(USER_KEY);
  };

  const addAppointment = async (
    newApp: Omit<Appointment, "id" | "status" | "clientId">,
  ) => {
    if (!user) return;

    const appointment: Appointment = {
      ...newApp,
      id: String(Date.now()),
      clientId: user.id,
      status: "pending",
    };

    try {
      const novaLista = [appointment, ...appointments];
      setAppointments(novaLista);
      await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(novaLista));
    } catch (error) {
      console.error("Erro ao salvar o agendamento offline:", error);
    }
  };

  const toggleAppointmentStatus = async (id: string) => {
    try {
      const novaLista = appointments.map((item) => {
        if (item.id === id) {
          const proximoStatus: Appointment["status"] =
            item.status === "pending"
              ? "confirmed"
              : item.status === "confirmed"
                ? "cancelled"
                : "pending";

          return { ...item, status: proximoStatus };
        }
        return item;
      });

      setAppointments(novaLista);
      await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(novaLista));
    } catch (error) {
      console.error("Erro ao atualizar status do agendamento:", error);
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      const novaLista = appointments.filter((item) => item.id !== id);
      setAppointments(novaLista);
      await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(novaLista));
    } catch (error) {
      console.error("Erro ao deletar agendamento", error);
    }
  };

  const filteredAppointments = appointments.filter((item) => {
    if (!user) return false;
    if (user.role === "admin") return item.providerId === user.id || true;
    return item.clientId === user.id;
  });

  return (
    <AppointmentContext.Provider
      value={{
        appointments: filteredAppointments,
        user,
        loading,
        login,
        logout,
        addAppointment,
        toggleAppointmentStatus,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentContext);
}
