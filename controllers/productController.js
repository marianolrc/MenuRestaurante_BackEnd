// controllers/productController.js
const Product = require('../models/productModel');

const multer = require('multer');
const storage = multer.memoryStorage(); // Almacenar la imagen en memoria
const upload = multer({ storage: storage });

// Middleware para cargar la imagen
const uploadImage = upload.single('product_img');


// Función para crear un nuevo producto
const createProduct = async (req, res) => {
  try {

    console.log(req.body);

    if (!req.file) {
      return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
    }

    const {
        category_product,
        subcategory_product,
        product_name,
        product_desciption,
        product_price,
        product_state
    } = req.body;

    const newProduct = new Product({
        category_product,
        subcategory_product,
        product_name,
        product_desciption,
        product_price,
        product_state
    });



    if (req.file) {
      // Si se adjuntó una imagen en la solicitud
      newProduct.product_img.title = req.file.originalname;
      newProduct.product_img.image = req.file.buffer;
    }

    await newProduct.save();
    res.status(201).json(newProduct);

  } catch (error) {
    res.status(500).json({ error: 'Error to create a new product' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const getProducts = await Product.find();
    res.json(getProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error to get the products'});
  }
}

const getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const getProduct = await Product.findOne({ _id: productId });
    if (!getProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(getProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
    const { productId } = req.params;
  try {
    const updateProduct = await Product.findOneAndUpdate({_id: productId}, {
      $set: req.body
    });
    if(!updateProduct) {
      return res.status(500).json({ error: 'Error Updating the Product' });
    }
    res.json(updateProduct);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deleteProduct = await Product.findOneAndDelete({ _id: productId });
    if (!deleteProduct) {
      return res.status(404).json({ error: 'Product Not found'});
    }

    res.json(deleteProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Aquí puedes agregar más funciones para obtener, actualizar o eliminar usuarios.

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct
  // Agrega aquí más funciones si es necesario.
};
