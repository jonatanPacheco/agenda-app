import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
       headerShown: true,
       tabBarActiveTintColor: "#007aff",
       tabBarInactiveTintColor: "#8e8e93", 
       }}>
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Agendamentos",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "calendar-clear" : "calendar-clear-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Meu Perfil",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "person-circle" : "person-circle-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
