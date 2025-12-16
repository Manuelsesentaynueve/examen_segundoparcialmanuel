import { Producto } from '../tipos/producto';

const IP_LOCAL = '192.168.1.41';
const PUERTO = 5050;
const BASE_URL = `http://${IP_LOCAL}:${PUERTO}/productos`;

export async function obtenerProductosAPI(): Promise<Producto[]> {
    try {
        const respuesta = await fetch(BASE_URL);
        if (!respuesta.ok) {
            throw new Error('Fallo al obtener la lista de productos');
        }
        const datos = await respuesta.json();
        return datos.map((p: any) => ({
            ...p,
            precio: String(p.precio)
        }));
    } catch (error) {
        console.error('Error en obtenerProductosAPI:', error);
        throw error;
    }
}

export async function crearProductoAPI(producto: Omit<Producto, 'id_producto'>): Promise<Producto> {
    try {
        const respuesta = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        });

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.mensaje || 'Fallo en la creación del producto');
        }

        const datos = await respuesta.json();
        return datos.producto;
    } catch (error) {
        console.error('Error en crearProductoAPI:', error);
        throw error;
    }
}


export async function eliminarProductoAPI(id_producto: number): Promise<void> {
    try {
        const respuesta = await fetch(`${BASE_URL}/${id_producto}`, {
            method: 'DELETE',
        });

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.mensaje || 'Fallo al eliminar el producto');
        }
    } catch (error) {
        console.error('Error en eliminarProductoAPI:', error);
        throw error;
    }
}