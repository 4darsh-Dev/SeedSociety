import MapComponent from '@/components/ui/MapComponent';
import React from "react";
import { StyleSheet, View } from "react-native";
const Map = () => {
    return (
        <View style={styles.container}>
            <MapComponent />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    map: {
      flex: 1,
    },
  });
  export default Map;