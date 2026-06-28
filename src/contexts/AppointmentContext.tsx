import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Appointment {
  id: string;
  providerId: string;
  serviceName: string;
  date: string;
  status: "pending" | "confirmed" | "cancelled";
}

interface AppoitmentContextData {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id" | "status">) => void;
  toggleAppointmentStatus: (id: string) => void;
  deleteAppointment: (id: string) => void;
}

const AppointmentContext = createContext<AppoitmentContextData>(
  {} as AppoitmentContextData,
);

const STORAGE_KEY = "@app_agendamentos:appointments";

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    async function loadStoredAppointments() {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setAppointments(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Erro ao carregar os agendamentos offline:", error);
      }
    }
    loadStoredAppointments();
  }, []);

  const addAppointment = async (newApp: Omit<Appointment, "id" | "status">) => {
    const appointment: Appointment = {
      ...newApp,
      id: String(Date.now()),
      status: "pending",
    };

    try {
      const novaLista = [appointment, ...appointments];
      setAppointments(novaLista);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
      console.log("Dados gravados com sucesso no armazenamento offline!");
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
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
    } catch (error) {
      console.error("Erro ao atualizar status do agendamento:", error);
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      const novaLista = appointments.filter((item) => item.id !== id);
      setAppointments(novaLista);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
    } catch (error) {
      console.error("Erro ao deletar agendamento", error);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
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
