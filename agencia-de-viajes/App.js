import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView,Modal,Button,TouchableHighlight } from "react-native";
import React,{useState} from "react";

export default function App() {
  const [modalVisiblePlaya, setModalVisiblePlaya] = useState(false);
  const [modalVisiblePlatillos, setModalVisiblePlatillos] = useState(false);
  const [modalVisibleRutas, setModalVisibleRutas] = useState(false);
  return (
    <ScrollView>
      <Modal transparent={true} animationType="slide" visible={modalVisiblePlaya} onRequestClose={()=>{
        alert('Modal has been closed');
      }}>
        <View style={styles.vistaModal}>
          <View style={styles.Modal}>
            <Text style={styles.subtitulo}> Ir a la playa</Text>
            <Text>El Salvador cuenta con hermosas playas a nivel de Centroamerica</Text>
            <Button title="Cerrar" onPress={()=>{setModalVisiblePlaya(!modalVisiblePlaya)}}> </Button>

          </View>

        </View>

      </Modal>
      
      <Modal transparent={true} animationType="slide" visible={modalVisiblePlatillos} onRequestClose={()=>{
        alert('Modal has been closed');
      }}>
        <View style={styles.vistaModal}>
          <View style={styles.Modal}>
            <Text style={styles.subtitulo}>Platillos Salvadoreños</Text>
            <Text>Descubre la deliciosa gastronomía de El Salvador, desde las tradicionales pupusas hasta otros platos típicos que representan nuestra cultura culinaria.</Text>
            <Button title="Cerrar" onPress={()=>{setModalVisiblePlatillos(!modalVisiblePlatillos)}}> </Button>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} animationType="slide" visible={modalVisibleRutas} onRequestClose={()=>{
        alert('Modal has been closed');
      }}>
        <View style={styles.vistaModal}>
          <View style={styles.Modal}>
            <Text style={styles.subtitulo}>Rutas Turísticas</Text>
            <Text>Explora las mejores rutas turísticas de El Salvador, desde sitios arqueológicos hasta paisajes naturales que te conectarán con la belleza del país.</Text>
            <Button title="Cerrar" onPress={()=>{setModalVisibleRutas(!modalVisibleRutas)}}> </Button>
          </View>
        </View>
      </Modal>
      
      <View style={{ flexDirection: "row" }}>
        <Image source={require("./src/img/bg.jpg")} style={styles.banner} />
      </View>

      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Que hacer en El Salvador</Text>
        <ScrollView horizontal={true}>
          <View>
            <TouchableHighlight onPress={() => {setModalVisiblePlaya(!modalVisiblePlaya)}}>
                          <Image
              source={require("./src/img/actividad1.jpg")}
              style={styles.ciudad}
            />
            </TouchableHighlight>

          </View>
          <View>
            <Image
              source={require("./src/img/actividad2.jpg")}
              style={styles.ciudad}
            />
          </View>
          <View>
            <Image
              source={require("./src/img/actividad3.jpg")}
              style={styles.ciudad}
            />
          </View>
          <View>
            <Image
              source={require("./src/img/actividad4.jpg")}
              style={styles.ciudad}
            />
          </View>
          <View>
            <Image
              source={require("./src/img/actividad5.jpg")}
              style={styles.ciudad}
            />
          </View>
        </ScrollView>
        <Text style={styles.titulo}> Platillos Salvadoreños</Text>
        <View>
          <View>
             <TouchableHighlight onPress={() => {setModalVisiblePlatillos(!modalVisiblePlatillos)}}>
                          <Image
              style={styles.mejores}
              source={require("./src/img/mejores1.jpg")}
            />
             </TouchableHighlight>
            <Image
              style={styles.mejores}
              source={require("./src/img/mejores2.jpg")}
            />
          </View>
          <View>
            <Image
              style={styles.mejores}
              source={require("./src/img/mejores3.jpg")}
            />
          </View>

        </View>
        <Text style={styles.titulo}> Rutas turisticas</Text>
        <View style={styles.listado}>
          <View style={styles.listaItem}>
             <TouchableHighlight onPress={() => {setModalVisibleRutas(!modalVisibleRutas)}}>
                          <Image
              style={styles.mejores}
              source={require("./src/img/ruta1.jpg")}
            />
             </TouchableHighlight>
            

          </View>
          <View style={styles.listaItem}>
            <Image
              style={styles.mejores}
              source={require("./src/img/ruta2.jpg")}
            />
          </View>
          <View style={styles.listaItem}>
            <Image
              style={styles.mejores}
              source={require("./src/img/ruta3.jpg")}
            />
          </View>
          <View style={styles.listaItem}>
            <Image
              style={styles.mejores}
              source={require("./src/img/ruta4.jpg")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 250,
    flex: 1,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 10,
  },
  contenedor: {
    marginHorizontal: 10,
  },
  ciudad: {
    width: 250,
    height: 300,
    marginRight: 10,
  },
  mejores: {
    width: "100%",
    height: 200,
    marginVertical: 5,
  },
  listaItem:{
    flexBasis:'49%'
  },
  listado:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between'
  },
  vistaModal:{
    backgroundColor:'#000000aa',
    flex:1
  },
  Modal:{
    backgroundColor:'#fff',
    margin:50,
    padding:40,
    borderRadius:10,
    flex:1,

  },
  subtitulo:{
    fontWeight:'bold',
    fontSize:14,
    justifyContent:'center'
  }
});
