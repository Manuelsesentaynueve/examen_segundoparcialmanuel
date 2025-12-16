import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { eliminarProductoAPI, obtenerProductosAPI } from '../api/producto_api';
import { Producto } from '../tipos/producto';


const ListaProductos: React.FC = () => { 
  const navigation = useNavigation(); 
  
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const cargarProductos = async () => {
    setCargando(true);
    try {
      const data = await obtenerProductosAPI();
      setProductos(data);
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : 'Error desconocido al obtener productos.';
      Alert.alert('Error de Carga', mensaje);
      setProductos([]);
    } finally {
      setCargando(false);
    }
  };
  
  const handleEliminar = async (id_producto: number) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que quieres eliminar este producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await eliminarProductoAPI(id_producto);
              Alert.alert('Éxito', 'Producto eliminado correctamente.');
              cargarProductos(); 
            } catch (error) {
              const mensaje = error instanceof Error ? error.message : 'Error al eliminar.';
              Alert.alert('Error', mensaje);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      cargarProductos();
      return () => {};
    }, [])
  );

  const renderItem = ({ item }: { item: Producto }) => (
    <View style={estilos.item}>
      <Text style={estilos.nombre}>{item.nombre}</Text>
      <Text style={estilos.detalle}>Precio: ${item.precio}</Text>
      <Text style={estilos.detalle}>Estado: {item.estado}</Text>
      <View style={estilos.botonContainer}>
        <Button 
          title="Ver Detalles" 
          onPress={() => Alert.alert('Detalle', `ID: ${item.id_producto}\nDescripción: ${item.descripcion}`)}
        />
        <Button 
          title="Eliminar" 
          onPress={() => handleEliminar(item.id_producto!)}
          color="#dc3545"
        />
      </View>
    </View>
  );

  return (
    <View style={estilos.contenedor}>
      <Button 
        title="Crear Nuevo Producto (Formulario)" 
        onPress={() => navigation.navigate('FormularioProducto' as never)} 
        color="#007bff"
      />

      <Text style={estilos.titulo}>Listado Simple de Productos</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id_producto!.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={estilos.vacio}>No hay productos creados. ¡Crea uno!</Text>}
        />
      )}
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detalle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  botonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  vacio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#aaa',
  },
});

export default ListaProductos;