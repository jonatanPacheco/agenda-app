import { AppointmentProvider } from "@/src/contexts/AppointmentContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AppointmentProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </AppointmentProvider>
  );
}
