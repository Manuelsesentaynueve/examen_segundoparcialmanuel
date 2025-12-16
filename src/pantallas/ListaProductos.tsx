import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { obtenerProductosAPI } from '../api/producto_api';
import { Producto, RootStackParamList } from '../tipos/producto';

type ListaProductosProps = NativeStackScreenProps<RootStackParamList, 'ListaProductos'>;

const ListaProductos: React.FC<ListaProductosProps> = ({ navigation }) => {
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


  useFocusEffect(
    useCallback(() => {
      cargarProductos();

      return () => {
      };
    }, [])
  );

  const renderItem =
   ({ item }: { item: Producto }) => (
    <View 
    style={estilos.item}>
      <Text 
      style={estilos.nombre}>{item.nombre}
      </Text>
      <Text 
      style={estilos.detalle}>Precio:LPS{item.precio}
      </Text>
      <Text 
      style={estilos.detalle}>Estado:{item.estado}
      </Text>
      <Button
        title="Ver Detalles"
        onPress={() => Alert.alert('Detalle', `ID: ${item.id_producto}
           Descripción:${item.descripcion}`)}
      />
    </View>
  );

  return (
    <View style={estilos.contenedor}>
      <Button
        title="Crear Nuevo Producto (Formulario)"
        onPress={() => navigation.navigate('FormularioProducto')}
        color="#007bff"
      />

      <Text style={estilos.titulo}>Listado de Productoss</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id_producto!.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={estilos.vacio}>No hay productos creados, Creá uno porfas</Text>}
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
  vacio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#aaa',
  },
});

export default ListaProductos;