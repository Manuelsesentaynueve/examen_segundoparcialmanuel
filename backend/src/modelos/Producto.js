const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db_conexion'); 

const Producto = sequelize.define('Producto', {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('Disponible', 'No disponible'),
        allowNull: false,
        defaultValue: 'Disponible',
    },
    categoria: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    url_fotografia: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'productos', 
    timestamps: true, 
});

module.exports = Producto;