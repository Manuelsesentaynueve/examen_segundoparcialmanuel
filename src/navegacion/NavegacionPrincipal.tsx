import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FormularioProducto from '../pantallas/FormularioProducto';
import ListaProductos from '../pantallas/ListaProductos';
import { RootStackParamList } from '../tipos/producto';
/*import DetalleProducto from '../pantallas/DetalleProducto';*/ // Lo crearemos después

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavegacionPrincipal = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaProductos">
        <Stack.Screen 
          name="ListaProductos" 
          component={ListaProductos} 
          options={{ title: 'Gestión de Productos' }}
        />
        <Stack.Screen 
          name="FormularioProducto" 
          component={FormularioProducto} 
          options={{ title: 'Crear/Editar Producto' }}
        />
        <Stack.Screen 
          name="DetalleProducto" 
          component={DetalleProducto} 
          options={{ title: 'Detalle del Producto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavegacionPrincipal;