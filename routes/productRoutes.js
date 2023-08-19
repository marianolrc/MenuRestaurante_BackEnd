// routes/productsRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');

const storage = multer.memoryStorage(); // Almacenamiento en memoria para el campo de archivo
const upload = multer({ storage: storage });

// Ruta protegida por autorizacion
router.get('/products', productController.getAllProducts);

// Ruta protegida para mostrar un producto
router.get('/products/:id', productController.getProduct);

// Ruta protegida para crear un nuevo producto
router.post('/products',  upload.single('image'), authMiddleware, productController.createProduct);

// Ruta protegida para modificar algun producto
router.put('/products/:id', upload.single('image'), authMiddleware, productController.updateProduct);

// Ruta protegida para eliminar un producto
router.delete('/products/:id', authMiddleware, productController.deleteProduct);

// Aquí puedes agregar más rutas para obtener, actualizar o eliminar usuarios.

module.exports = router;
