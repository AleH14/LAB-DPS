import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
const LiveLocationMap = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      // Pedir permisos de ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Habilita el GPS para ver tu ubicación."
        );
        return;
      }
      // Obtener ubicación en tiempo real
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Actualiza cada 1 segundo
          distanceInterval: 1, // Actualiza cada 1 metro
        },
        (newLocation) => {
          setLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });
        }
      );
      return () => locationSubscription.remove();
    })();
  }, []);
  if (!location) {
    return <View style={styles.container} />;
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        showsUserLocation={true} // Muestra el punto azul de la ubicación
        followsUserLocation={true} // Sigue al usuario en el mapa
      >
        <Marker coordinate={location} title="¡Aquí estoy!" />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
export default LiveLocationMap;
