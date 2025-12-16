import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import FormularioProducto from './src/pantallas/FormularioProducto';
import ListaProductos from './src/pantallas/ListaProductos';
import { RootStackParamList } from './src/tipos/producto';

const Stack = createNativeStackNavigator
<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar 
      style="auto" />
      <Stack.Navigator
       initialRouteName=
      "FormularioProducto">
        <Stack.Screen
                 name="FormularioProducto"
          component={FormularioProducto}
          options={{ title: 'Crear Producto (POST)' }}
        />
        <Stack.Screen
          name="ListaProductos"
          component={ListaProductos}
          options={{ title: 'Listado de Productos (GET)' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}