import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Agendamentos",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Meu Perfil",
        }}
      />
    </Tabs>
  );
}
