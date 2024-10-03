const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Función para crear la conexión a la base de datos
async function createConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
        console.log('Conexión a la base de datos establecida con éxito');
        return connection;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        return null;
    }
}

let connection;

// Ruta principal
app.get('/', async (req, res) => {
    if (!connection) {
        res.status(500).send('Error de conexión a la base de datos');
        return;
    }

    try {
        const [rows] = await connection.query('SELECT 1 as result');
        res.send(`Conexión a la base de datos exitosa. Resultado de prueba: ${rows[0].result}`);
    } catch (error) {
        console.error('Error al ejecutar consulta:', error.message);
        res.status(500).send('Error al ejecutar consulta en la base de datos');
    }
});

// Iniciar el servidor
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('Host:', process.env.DB_HOST);
    console.log('Puerto:', process.env.DB_PORT);
    console.log('Usuario:', process.env.DB_USER);
    console.log('Base de datos:', process.env.DB_DATABASE);
    
    // Intentar establecer la conexión a la base de datos
    connection = await createConnection();
    if (!connection) {
        console.log('El servidor se ha iniciado, pero no se pudo conectar a la base de datos');
    }
});