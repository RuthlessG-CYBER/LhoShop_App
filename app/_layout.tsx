import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/IBMPlexSans-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/IBMPlexSans-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/IBMPlexSans-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
    </PaperProvider>
  );
}
