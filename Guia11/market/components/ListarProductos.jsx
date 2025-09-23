import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet,
} from "react-native";
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
const ListarProductos = ({ navigation }) => {
  const [elementos, setElementos] = useState([]);
  const [total, setTotal] = useState(0);
  const uri = "https://apimarket-production-bd15.up.railway.app"; //Asegúrate de reemplazar la URL completa con la URI que has creado."
  useEffect(() => {
    cargarRegistros();
    // Agregar listener para actualizar al regresar de la pantalla de agregar producto
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      cargarRegistros();
    });
    return unsubscribe;
  }, []);
  const cargarRegistros = () => {
    fetch(`${uri}/productos`)
      .then((response) => response.json())
      .then((responseJson) => {
        const listado = responseJson.productos;
        // console.log(listado);
        setElementos(listado);
        setTotal(listado.length);
      })
      .catch((error) => console.error(error));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>{total} productos</Text>
      <FlatList
        data={elementos}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PaginaDetalle", { id: item.id })
            }
          >
            <View style={styles.itemContainer}>
              <Image
                style={styles.itemImage}
                source={{ uri: item.fotografia }}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.nombre}</Text>
                <Text style={styles.itemPrice}>${item.precio_venta}</Text>
                <Text style={styles.itemStock}>Existencia {item.cantidad}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("PaginaAgregar")}
      >
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  totalText: {
    fontSize: 18,
    textAlign: "center",
    height: 40,
    marginTop: 10,
    backgroundColor: "lightgray",
    textAlignVertical: "center",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 2,
  },
  itemImage: {
    width: 90,
    height: 90,
  },
  itemDetails: {
    height: 80,
    marginLeft: 5,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemStock: {
    fontSize: 14,
  },
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 70,
    height: 70,
    backgroundColor: "red",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
  },
});
export default ListarProductos;
