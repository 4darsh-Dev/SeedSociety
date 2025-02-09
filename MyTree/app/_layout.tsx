import { Stack, useRouter } from "expo-router";
import CustomSplashScreen from "@/components/ui/customSplashScreen";
import { useEffect, useState } from "react";
import "../global.css";
import auth from "@react-native-firebase/auth";
import { AppProvider } from './context/AppContext';

export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Start with null
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      console.log("User:", user);
      setIsAuthenticated(!!user);
      setAppReady(true);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (isAuthenticated === null) return; // Don't navigate until we know the auth state

    if (isAuthenticated) {
      router.replace("/(tabs)"); // Use replace instead of push to prevent going back to intro
    } else {
      router.replace("/(intro)");
    }
  }, [isAuthenticated]);

  if (!isAppReady) {
    return <CustomSplashScreen />;
  }

  return (
    <AppProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="+not-found" />
    </Stack>
    </AppProvider>
  );
}
