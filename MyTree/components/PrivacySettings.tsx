import React from "react";
import { View, StyleSheet } from "react-native";
import SettingOption from "./SettingsOption";

export default function PrivacySettings() {
  return (
    <View style={styles.container}>
      <SettingOption iconName="lock-closed-sharp" title="Change Password" colorOpt="#7C3AED" onPress={() => {}} />
      <SettingOption iconName="eye-off-sharp" title="Privacy Settings"  colorOpt="#7C3AED" onPress={() => {}} />
      <SettingOption iconName="trash-bin-sharp" title="Delete Account" colorOpt="red" onPress={() => {}} />
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
