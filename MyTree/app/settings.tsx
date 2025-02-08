import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GeneralSettings from "../components/GeneralSettings";
import PrivacySettings from "../components/PrivacySettings";
import NotificationSettings from "../components/NotificationSettings";
import AboutApp from "../components/AboutApp";

const Tab = createMaterialTopTabNavigator();

export default function Settings() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#25292e" },
        tabBarIndicatorStyle: { backgroundColor: "#ffd33d" },
        tabBarLabelStyle: { color: "#fff" },
      }}
    >
      <Tab.Screen name="General" component={GeneralSettings} />
      <Tab.Screen name="Privacy" component={PrivacySettings} />
      <Tab.Screen name="Notifications" component={NotificationSettings} />
      <Tab.Screen name="Build Info" component={AboutApp} />
    </Tab.Navigator>
  );
}