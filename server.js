// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//const dbConfig = require('./database/dbConfig');
require('dotenv').config();

// Inicializar express
const app = express();

// Configuraciones del servidor
const port = process.env.PORT || 3000;

// Importar la función de conexión a la base de datos desde dbConfig.js
const { dbConnection } = require('./database/dbConfig');

// Llamar a la función de conexión antes de iniciar el servidor
dbConnection()
    .then(() => {
        // Middleware
        app.use(express.json());
        app.use(cors());
        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({ extended: true}));

        // Routes
        app.use('/api', require('./routes/userRoutes'));
        app.use('/api', require('./routes/authRoutes'));
        app.use('/api', require('./routes/productRoutes'));

        // Start the Server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        });
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
        process.exit(1); // Salir del proceso si hay un error en la conexión
    });