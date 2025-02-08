import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BuildDetails: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Muskan AI</Text>
      <Text style={styles.text}>Version: 1.0.0</Text>
      <Text style={styles.text}>© 2024 Muskan AI. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
});

export default BuildDetails;
