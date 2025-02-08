import React from "react";
import { View, StyleSheet } from "react-native";
import SettingOption from "./SettingsOption";

export default function GeneralSettings() {
  return (
    <View style={styles.container}>
      <SettingOption iconName="settings-sharp" title="Language" colorOpt="#7C3AED" onPress={() => {}} />
      <SettingOption iconName="calendar-sharp" title="Date & Time" colorOpt="#7C3AED" onPress={() => {}} />
      <SettingOption iconName="color-palette-sharp" title="Theme" colorOpt="#7C3AED" onPress={() => {}} />
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
