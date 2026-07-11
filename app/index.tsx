import { Redirect } from "expo-router";

export default function Index() {
  //const { user } = useAuth();
  //if(user) return <Redirect href="/(tabs)/appointments" />
  return <Redirect href="/(auth)" />;
}
