import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { crearProductoAPI } from '../api/producto_api';
import { EstadoProducto, Producto } from '../tipos/producto';


const ESTADO_INICIAL: Omit<Producto, 'id_producto'> = {
  nombre: '',
  descripcion: '',
  precio: '', 
  estado: 'Disponible', 
  categoria: '',
  url_fotografia: '',
};

const FormularioProducto: React.FC = () => {
  const navigation = useNavigation();
  
  const [producto, setProducto] = useState(ESTADO_INICIAL);
  const [cargando, setCargando] = useState(false);


  const handleInputChange =
   (campo: keyof typeof ESTADO_INICIAL, 
    valor: string | EstadoProducto) => {
    setProducto(prev => ({ ...prev, [campo]: valor }));
  };

  const seleccionarFotografia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado',
         'Necesitamos acceso a la galería para seleccionar una imagen.');
      return;
    }

    let resultado =
     await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!resultado.canceled) {
      handleInputChange('url_fotografia',
         resultado.assets[0].uri);
    }
  };
  const handleGuardar = async () => {
    if (!producto.nombre || !producto.precio ||
         !producto.estado) {
      Alert.alert('Error', 'Por favor, complete Nombre, Precio y Estado.');
      return;
    }

    setCargando(true);
    try {
      const productoAEnviar = {
        ...producto,
        precio:
         parseFloat(producto.precio).toFixed(2),
      };

      await crearProductoAPI(productoAEnviar);
      
      Alert.alert('Éxito', `Producto 
        ${producto.nombre} creado correctamente.`);
      setProducto(ESTADO_INICIAL);
      navigation.navigate('ListaProductos' as never); 

    } catch (error) {
      const mensaje = error instanceof Error ?
       error.message : 'Error desconocido al guardar.';
      Alert.alert('Error de API', mensaje);
    } finally {
      setCargando(false);
    }
  };


  return (
    <ScrollView style={estilos.contenedor}>
      <Button 
        title="Ver Listado de Productos" 
        onPress={() => navigation.navigate('ListaProductos' as never)}
        color="#28a745" 
      />
      
      <Text style={estilos.etiqueta}>Nombre</Text>
      <TextInput
        style={estilos.input}
        value={producto.nombre}
        onChangeText={(text) => handleInputChange('nombre', text)}
        placeholder="Nombre del producto"
      />

      <Text style={estilos.etiqueta}>Descripción</Text>
      <TextInput
        style={estilos.input}
        value={producto.descripcion}
        onChangeText={(text) => handleInputChange('descripcion', text)}
        placeholder="Descripción detallada"
        multiline
      />

      <Text style={estilos.etiqueta}>Estado</Text>
      <View style={estilos.pickerContainer}>
        <Picker
          selectedValue={producto.estado}
          onValueChange={(itemValue: EstadoProducto) => handleInputChange('estado', itemValue)}
        >
          <Picker.Item label="Disponible" value="Disponible" />
          <Picker.Item label="No disponible" value="No disponible" />
        </Picker>
      </View>

      <Text style={estilos.etiqueta}>Categoría</Text>
      <TextInput
        style={estilos.input}
        value={producto.categoria}
        onChangeText={(text) => handleInputChange('categoria', text)}
        placeholder="Ej: Electrónica, Ropa, etc."
      />

      <Text style={estilos.etiqueta}>Precio</Text>
      <TextInput
        style={estilos.input}
        value={producto.precio}
        onChangeText={(text) => handleInputChange('precio', text.replace(/[^0-9.]/g, ''))}
        keyboardType="numeric"
        placeholder="Precio (ej: 100.50)"
      />
      <Text style={estilos.etiqueta}>Fotografía</Text>
      <TouchableOpacity 
        style={estilos.fotoPlaceholder} 
        onPress={seleccionarFotografia}
        disabled={cargando}
      >
        {producto.url_fotografia ? (
          <Image 
            source={{ uri: producto.url_fotografia }} 
            style={estilos.imagen} 
            resizeMode="cover"
          />
        ) : (
          <Text style={estilos.textoFoto}>Tocar para subir imagen</Text>
        )}
      </TouchableOpacity>

      <View style={estilos.botonGuardar}>
        <Button 
          title={cargando ? 'Guardando...' : 'Guardar Producto'} 
          onPress={handleGuardar} 
          disabled={cargando}
        />
      </View>
      
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  fotoPlaceholder: {
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
    marginBottom: 20,
  },
  textoFoto: {
    color: '#666',
    fontStyle: 'italic',
  },
  imagen: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    resizeMode: 'cover', 
  },
  botonGuardar: {
    marginTop: 20,
    marginBottom: 40,
  }
});

export default FormularioProducto;