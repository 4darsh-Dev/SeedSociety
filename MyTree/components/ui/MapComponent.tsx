import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";

const MapComponent = () => {
  return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.505, // Example latitude
          longitude: -0.09, // Example longitude
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        {/* Add OpenStreetMap tiles */}
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

        {/* Add a marker */}
        <Marker
          coordinate={{ latitude: 28.6740457, longitude: 77.4180267 }}
          title="Hello"
          description="This is an example marker."
        />
        <Marker
          coordinate={{ latitude: 28.6750457, longitude: 77.4180267 }}
          title="Hello"
          description="This is an example marker."
        />
      </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapComponent;
