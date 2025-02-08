import React from "react";
import { View, StyleSheet } from "react-native";
import SettingOption from "./SettingsOption";

export default function NotificationSettings() {
  return (
    <View style={styles.container}>
      <SettingOption iconName="notifications-sharp" title="Push Notifications" colorOpt="#7C3AED" onPress={() => {}} />
      <SettingOption iconName="volume-mute-sharp" title="Do Not Disturb" colorOpt="#7C3AED" onPress={() => {}} />
      <SettingOption iconName="mail-sharp" title="Email Notifications" colorOpt="#7C3AED" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
});
