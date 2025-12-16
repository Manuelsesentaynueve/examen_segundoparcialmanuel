const { Sequelize } = require('sequelize');

const DB_NOMBRE = 'Examen_Manuel';
const DB_USUARIO = 'root'; 
const DB_PASSWORD = '';

const sequelize = new Sequelize(
    DB_NOMBRE,
    DB_USUARIO,
    DB_PASSWORD,
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        logging: false,
    }
);


async function conectar_db() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
        await sequelize.sync({ alter: true }); 
        console.log(" sincronizados con la base de datos.");
    } catch (error) {
        console.error(' Error al conectar a la base de datos:', error);
    }
}

module.exports = { sequelize, conectar_db };