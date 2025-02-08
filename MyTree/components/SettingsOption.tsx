import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SettingOptionProps {
  iconName: string;
  title: string;
  onPress: () => void;
  colorOpt : string;
}

const SettingOption: React.FC<SettingOptionProps> = ({ iconName, title, onPress, colorOpt = "#7C3AED" }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.option}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={24} color={colorOpt} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3E8FF",
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default SettingOption;
