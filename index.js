const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Conectar a la base de datos
connection.connect((err) => {
    console.log('Conectando a la base de datos MySQL...');
    console.log('Host: ' + process.env.DB_HOST);
    console.log('Puerto: ' + process.env.DB_PORT);
    console.log('Usuario: ' + process.env.DB_USER);
    console.log('Contraseña: ' + process.env.DB_PASSWORD);
    console.log('Base de datos: ' + process.env.DB_DATABASE);  
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL como ID ' + connection.threadId);
});

app.get('/', (req, res) => {
    res.send('¡Hola, mundo! Conectado a MySQL.');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
