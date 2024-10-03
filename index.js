const express = require('express');
const mysql = require('mysql2');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('¡Hola, mundo! Conectado a MySQL. ${process.env.DB_HOST}, ${process.env.DB_PORT}, ${process.env.DB_USER}, ${process.env.DB_PASSWORD}, ${process.env.DB_DATABASE}');
});

app.listen(PORT, () => {
    console.log('Hola');
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('Host: ' + process.env.DB_HOST);
    console.log('Puerto: ' + process.env.DB_PORT);
    console.log('Usuario: ' + process.env.DB_USER);
    console.log('Contraseña: ' + process.env.DB_PASSWORD);  
    console.log('Base de datos: ' + process.env.DB_DATABASE);
});
