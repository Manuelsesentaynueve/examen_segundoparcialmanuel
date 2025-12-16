const express = require('express');
const cors = require('cors');
const { conectar_db } = require('./src/config/db_conexion');
const productoRutas = require('./src/rutas/producto_rutas');
require('dotenv').config();

const app = express();
const PUERTO = process.env.PORT || 5050;

app.use(cors()); 
app.use(express.json()); 

app.use('/productos', productoRutas);

conectar_db().then(() => {
    app.listen(PUERTO, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PUERTO}`);
    });
}).catch(error => {
    console.error(" No se pudo iniciar el servidor debido a un error de DB.", error);
});