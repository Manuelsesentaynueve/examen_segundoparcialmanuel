export type EstadoProducto = 'Disponible' | 'No disponible';

export interface Producto {
    id_producto?: number;
    nombre: string;
    descripcion: string;
    precio: string;
    estado: EstadoProducto;
    categoria: string;
    url_fotografia: string;
}

export type RootStackParamList = {
    FormularioProducto: undefined;
    ListaProductos: undefined;
    DetalleProducto: { productoId: number };
};