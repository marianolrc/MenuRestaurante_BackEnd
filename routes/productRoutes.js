// routes/productsRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta protegida por autorizacion
router.get('/products', userController.getAllUsers);

// Ruta protegida para mostrar un producto
router.get('/product/:id', userController.getAnUser);

// Ruta protegida para crear un nuevo producto
router.post('/products', authMiddleware, userController.createUser);

// Ruta protegida para modificar algun producto
router.put('/products/:id', authMiddleware, userController.updateUser);

// Ruta protegida para eliminar un producto
router.delete('/products/:id', authMiddleware, userController.deleteUser);

// Aquí puedes agregar más rutas para obtener, actualizar o eliminar usuarios.

module.exports = router;
