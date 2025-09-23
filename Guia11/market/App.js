import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PantallaInicio from './components/PantallaInicio';
import ListarProductos from './components/ListarProductos';
import PaginaDetalle from './components/PaginaDetalle';
import PaginaAgregar from './components/PaginaAgregar';
const Stack = createStackNavigator();
function MyStack() {
 return (
 <Stack.Navigator>
 <Stack.Screen name="PantallaInicio" component={PantallaInicio} options={{
headerShown: false }} />
 <Stack.Screen name="ListarProductos" component={ListarProductos} options={{
headerShown: false }} />
 <Stack.Screen name="PaginaDetalle" component={PaginaDetalle} />
 <Stack.Screen name="PaginaAgregar" component={PaginaAgregar} />
 </Stack.Navigator>
 );
}
export default function App() {
 return (
 <SafeAreaProvider>
 <NavigationContainer>
 <MyStack/>
 </NavigationContainer>
 </SafeAreaProvider>
 )
}