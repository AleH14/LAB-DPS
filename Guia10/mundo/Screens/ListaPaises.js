import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

const ListaPaises = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://65f9be823909a9a65b1942ac.mockapi.io/paises"
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const renderItem = ({ item }) => {
    // Map country names to ISO country codes for flag service
    const countryCodeMap = {
      'Argentina': 'ar',
      'Estados Unidos': 'us',
      'Guatemala': 'gt',
      'Honduras': 'hn',
      'El Salvador': 'sv',
      'Nicaragua': 'ni',
      'Costa Rica': 'cr',
      'Panamá': 'pa',
      'República Dominicana': 'do',
      'Cuba': 'cu'
    };
    
    const countryCode = countryCodeMap[item.nombre.espanol];
    const flagUrl = countryCode 
      ? `https://flagcdn.com/w160/${countryCode}.png`
      : item.bandera; // fallback to original if no mapping found

    return (
      <TouchableOpacity
        style={styles.countryCard}
        onPress={() => navigation.navigate("DetallePais", { country: item })}
      >
        <View style={styles.countryInfo}>
          <Image 
            source={{ uri: flagUrl }}
            style={styles.flagImage}

            
            onError={(e) => {
              console.log('Flag error for:', item.nombre.espanol, e.nativeEvent.error);
            }}
          />
          <Text style={styles.countryName}>{item.nombre.espanol}</Text>

        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={countries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.countryList}
        numColumns={2} // Muestra dos países por fila
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  countryList: {
    padding: 10,
  },
  countryCard: {
    width: windowWidth / 2 - 15, // Ajusta el ancho para mostrar dos países
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden", // Para que la bandera no sobresalga del borde de la tarjeta,
  },
  countryInfo: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  flagImage: {
    width: 100,
    height: 100,
  },
  debugText: {
    fontSize: 10,
    color: 'blue',
    marginTop: 5,
  },
  countryName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
export default ListaPaises;
