import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Input } from "@rneui/themed";
const PaginaAgregar = ({ navigation }) => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    preciodeventa: "",
    preciodecosto: "",
    cantidad: "",
    fotografia: "",
  });
  const isValidNombre = (name) => /^[A-Za-z\s]+$/.test(name);
  const isValidCantidad = (cant) => /^\d+$/.test(cant);
  const isValidPrice = (price) => /^([0-9]+\.?[0-9]{0,2})$/.test(price);
  const uri = "https://apimarket-production-bd15.up.railway.app"; //Asegúrate de reemplazar la URL completa con la URI que has creado."
  const guardar = () => {
    if (!isValidNombre(producto.nombre)) {
      Alert.alert(
        "Error",
        "Nombre inválido. Debe contener solo letras y espacios."
      );
      return;
    }
    if (!isValidCantidad(producto.cantidad)) {
      Alert.alert(
        "Error",
        "cantidad inválido. Debe contener solo numeros enteros."
      );
      return;
    }
    if (
      !isValidPrice(producto.preciodecosto) ||
      !isValidPrice(producto.preciodeventa)
    ) {
      Alert.alert(
        "Error",
        "precio inválido. Debe contener solo dos decimales."
      );
      return;
    }
    const body = {
      description: producto.descripcion,
      image: producto.fotografia,
      name: producto.nombre,
      price_cost: producto.preciodecosto,
      price_sale: producto.preciodeventa,
      quantity: producto.cantidad,
    };
    // Petición para agregar el producto
    fetch(`${uri}/productos`, {
      method: "POST", // Cambiamos a POST
      headers: {
        "Content-Type": "application/json", // Especificamos que enviamos JSON
      },
      body: JSON.stringify(body), // Convertimos el objeto a JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.statusText}`);
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log("Respuesta del servidor:", responseJson);
        const mensaje = responseJson.message; // Asegúrate de que esto coincida con la respuesta delservidor;
        if (!mensaje) {
          Alert.alert("Error", "Error al agregar!");
        } else {
          Alert.alert("Éxito", mensaje);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error("Error al agregar:", error);
        Alert.alert("Error", `Error de Internet!! ${error.message}`);
      });
  };
  return (
    <View style={styles.container}>
      <Input
        label="Nombre"
        value={producto.nombre}
        onChangeText={(text) => setProducto({ ...producto, nombre: text })}
      />
      <Input
        label="Descripción"
        value={producto.descripcion}
        onChangeText={(text) => setProducto({ ...producto, descripcion: text })}
      />
      <Input
        label="Precio de costo"
        value={producto.preciodecosto}
        onChangeText={(text) =>
          setProducto({ ...producto, preciodecosto: text })
        }
      />
      <Input
        label="Precio de venta"
        value={producto.preciodeventa}
        onChangeText={(text) =>
          setProducto({ ...producto, preciodeventa: text })
        }
      />
      <Input
        label="Cantidad"
        value={producto.cantidad}
        onChangeText={(text) => setProducto({ ...producto, cantidad: text })}
      />
      <Input
        label="Fotografía"
        value={producto.fotografia}
        onChangeText={(text) => setProducto({ ...producto, fotografia: text })}
      />
      <TouchableOpacity style={styles.button} onPress={guardar}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    height: 50,
    backgroundColor: "red",
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
export default PaginaAgregar;
