// controllers/cartController.js
const ShoppingCart = require('../models/shoppingCartModel');

const createCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { date, productId, product_price, order_status } = req.body;

    const newCart = new ShoppingCart({
      userId,
      date,
      productId,
      product_price,
      total_to_pay: product_price, // Calcula el total de la misma forma que antes
      order_status,
    });

    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo carrito de compras' });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const getCarts = await ShoppingCart.find();
    res.json(getCarts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos de compras' });
  }
};

const getCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const getCart = await ShoppingCart.findOne({ _id: cartId });
    if (!getCart) {
      return res.status(404).json({ error: 'Carrito de compras no encontrado' });
    }
    res.json(getCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCart = async (req, res) => {
  const cartId = req.params.id;

  try {
    const updateCart = await ShoppingCart.findOneAndUpdate(
      { _id: cartId },
      { $set: req.body },
      { new: true }
    );
    if (!updateCart) {
      return res.status(500).json({ error: 'Error al actualizar el carrito de compras' });
    }
    res.json(updateCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCart = async (req, res) => {
  const cartId = req.params.id;

  try {
    const deleteCart = await ShoppingCart.findOneAndDelete({ _id: cartId });
    if (!deleteCart) {
      return res.status(404).json({ error: 'Carrito de compras no encontrado' });
    }

    res.json(deleteCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCart,
  updateCart,
  deleteCart
};