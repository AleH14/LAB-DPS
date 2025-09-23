import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Input } from "@rneui/themed";
const PaginaDetalle = ({ route, navigation }) => {
  // Estado para manejar el producto y la carga
  const [producto, setProducto] = useState({});
  const [cargando, setCargando] = useState(true); // Estado de carga
  const [error, setError] = useState(null);
  const uri = "https://apimarket-production-bd15.up.railway.app";
  const endpoint = `${uri}/productos/${route.params?.id}`; // Obtiene el ID del producto desde los parámetros;
  // useEffect para obtener los detalles del producto al montar el componente
  useEffect(() => {
    console.log(route.params?.id);
    if (route.params?.id) {
      obtenerProducto(); // Llamar si hay un ID de producto válido
    }
  }, [route.params?.id]);
  // Funciones de validación
  const isValidNombre = (name) => /^[A-Za-z\s]+$/.test(name);
  const isValidCantidad = (cant) => /^\d+$/.test(cant);
  const isValidPrice = (price) => /^([0-9]+\.?[0-9]{0,2})$/.test(price);
  const obtenerProducto = async () => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      // console.log(data.productos[0]);
      // Validar si la respuesta tiene los datos correctos
      if (response.ok && data) {
        setProducto(data.productos[0]);
        setCargando(false); // Cambiar el estado de carga
      } else {
        throw new Error("No se pudieron obtener los datos del producto");
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      setError("Error al cargar el producto. Intenta de nuevo.");
      setCargando(false); // Cambiar el estado de carga aunque ocurra un error
    }
  };
  const actualizar = () => {
    // Validaciones de campos
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
        "Cantidad inválida. Debe contener solo números enteros."
      );
      return;
    }
    if (
      !isValidPrice(producto.precio_costo) ||
      !isValidPrice(producto.precio_venta)
    ) {
      Alert.alert(
        "Error",
        "Precio inválido. Debe contener solo dos decimales."
      );
      return;
    }
    // Definición del cuerpo de la solicitud
    const body = {
      name: producto.nombre,
      description: producto.descripcion,
      price_cost: parseFloat(producto.precio_costo),
      price_sale: parseFloat(producto.precio_venta),
      quantity: parseInt(producto.cantidad, 10),
      image: producto.fotografia,
    };
    // Petición para actualizar el producto
    fetch(`${uri}/productos/${route.params?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.statusText}`);
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log("Respuesta del servidor:", responseJson); // Agrega esta línea
        // Usa "message" en lugar de "mensaje"
        const mensaje = responseJson.message;
        if (!mensaje) {
          Alert.alert("Error", "Error al actualizar!");
        } else {
          Alert.alert("Actualización", mensaje);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error("Error al actualizar:", error);
        Alert.alert("Error", `Error de Internet!! ${error.message}`);
      });
  };
  const eliminar = () => {
    // Confirma la acción de eliminar
    Alert.alert(
      "Eliminar Producto",
      "¿Estás seguro de que deseas eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            // Petición para eliminar el producto
            fetch(`${uri}/productos/${route.params?.id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `Error en la respuesta: ${response.statusText}`
                  );
                }
                return response.json();
              })
              .then((responseJson) => {
                console.log("Respuesta del servidor:", responseJson); // Agrega esta línea
                const mensaje = responseJson.message; // Asegúrate de que esto coincida con la respuesta del servidor
                if (!mensaje) {
                  Alert.alert("Error", "Error al eliminar!");
                } else {
                  Alert.alert("Eliminación", mensaje);
                  navigation.goBack();
                }
              })
              .catch((error) => {
                console.error("Error al eliminar:", error);
                Alert.alert("Error", `Error de Internet!! ${error.message}`);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };
  // Renderizar la actividad de carga mientras se obtienen los datos
  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando producto...</Text>
      </View>
    );
  }
  // Mostrar el error si ocurre
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={actualizar}>
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={eliminar}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <Input
            label="Nombre"
            value={producto.nombre}
            onChangeText={(text) => setProducto({ ...producto, nombre: text })}
          />
          <Input
            label="Descripción"
            value={producto.descripcion}
            onChangeText={(text) =>
              setProducto({ ...producto, descripcion: text })
            }
          />
          <Input
            label="Precio de costo"
            value={
              producto.precio_costo ? producto.precio_costo.toString() : ""
            }
            onChangeText={(text) =>
              setProducto({ ...producto, precio_costo: text })
            }
          />
          <Input
            label="Precio de venta"
            value={
              producto.precio_venta ? producto.precio_venta.toString() : ""
            }
            onChangeText={(text) =>
              setProducto({ ...producto, precio_venta: text })
            }
          />
          <Input
            label="Cantidad"
            value={producto.cantidad ? producto.cantidad.toString() : ""}
            onChangeText={(text) =>
              setProducto({ ...producto, cantidad: text })
            }
          />
          <Input
            label="Fotografía"
            value={producto.fotografia}
            onChangeText={(text) =>
              setProducto({ ...producto, fotografia: text })
            }
          />
          <Image style={styles.image} source={{ uri: producto.fotografia }} />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 40,
    backgroundColor: "black",
    borderRadius: 5,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  detailsContainer: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PaginaDetalle;
