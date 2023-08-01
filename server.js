// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dbConfig = require('./database/dbConfig');
require('dotenv').config();

// Inicializar express
const app = express();

// Configuraciones del servidor
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/authRoutes'));

// Start the Server
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`)
});
