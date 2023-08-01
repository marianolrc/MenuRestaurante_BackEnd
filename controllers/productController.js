// controllers/productController.js
const Product = require('../models/productModel');

// Función para crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const {
        category_product,
        subcategory_product,
        product_name,
        product_desciption,
        product_price,
        product_img,
        product_state
    } = req.body;

    const newProduct = new Product({
        category_product,
        subcategory_product,
        product_name,
        product_desciption,
        product_price,
        product_img,
        product_state
    });
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
    const getProduct = await Product.findOne({ productId });
    if (!getProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(getProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {

  try {
    const updateProduct = await Product.findOneAndUpdate({_id: req.body.userId}, {
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
    const deleteProduct = await Product.findOneAndDelete({ productId });
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
