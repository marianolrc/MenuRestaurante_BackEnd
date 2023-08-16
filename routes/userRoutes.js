// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta protegida por autorizacion
router.get('/users', authMiddleware, userController.getAllUsers);

// Ruta protegida para mostrar un usuario
router.get('/user/:id', authMiddleware, userController.getUser);

// Ruta protegida para crear un nuevo usuario
router.post('/users',  userController.createUser);

// Ruta protegida para modificar algun usuario
router.put('/user/:id', authMiddleware, userController.updateUser);

// Ruta protegida para eliminar a un usuario
router.delete('/user/:id', authMiddleware, userController.deleteUser);

// Aquí puedes agregar más rutas para obtener, actualizar o eliminar usuarios.

module.exports = router;
