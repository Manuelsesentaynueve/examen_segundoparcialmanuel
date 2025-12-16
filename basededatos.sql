CREATE DATABASE Examen_Manuel;

use Examen_Manuel;

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL,
    estado ENUM('Disponible', 'No disponible') NOT NULL DEFAULT 'Disponible',
    categoria VARCHAR(50),
    url_fotografia VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

