import React from "react";
import { View, StyleSheet } from "react-native";
import BuildDetails from "./BuildDetails";

export default function AboutApp() {
  return (
    <View style={styles.container}>
      <BuildDetails />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
});
