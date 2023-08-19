// controllers/productController.js
const Product = require('../models/productModel');

// Función para crear un nuevo producto
const createProduct = async (req, res) => {
  try {

    const newProduct = new Product(req.body);

    if (req.file) {
      newProduct.product_img = {
          title: req.file.originalname,
          image: req.file.buffer
      };
  }

    await newProduct.save();
    res.status(201).json(newProduct);

  } catch (error) {
    console.log(error);
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
  const productId = req.params.id;

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
    const productId = req.params.id;
  try {
    const updateProduct = await Product.findOneAndUpdate(
      {_id: productId},
      {$set: req.body},
      { new: true});

    if(!updateProduct) {
      return res.status(500).json({ error: 'Error Updating the Product' });
    }
    res.json(updateProduct);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

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
