import { Stack } from "expo-router";
import CustomSplashScreen from '@/components/ui/customSplashScreen';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import CameraScreen from './CameraScreen';
export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      // Pre-load any resources or data that we need prior to rendering the app
      await performSomeTask();
      setAppReady(true);
    }

    prepare();
  }, []);

  async function performSomeTask() {
    // Simulate a task by waiting for 2 seconds
    return new Promise(resolve => setTimeout(resolve, 5000));
  }


  if (!isAppReady) {
    return <CustomSplashScreen />;
  }
  return <Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="CameraScreen"  options={{ headerShown: false }} />
  {/* <Stack.Screen name="+not-found" /> */}
</Stack>;
}
