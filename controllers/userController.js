// controllers/userController.js
const User = require('../models/userModel');

// Función para crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { name_surname, email, password, state, rol } = req.body;
    const newUser = new User({
      name_surname,
      email,
      password,
      state,
      rol,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error to create a new user' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    res.status(500).json({ error: 'Error to get the users'});
  }
}

const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const getUser = await User.findOne({ _id: userId });
    if (!getUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(getUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;

  try {
    const updateUser = await User.findOneAndUpdate({_id: userId}, {
      $set: req.body
    });
    if(!updateUser) {
      return res.status(500).json({ error: 'Error Updating the User' });
    }
    res.json(updateUser);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deleteUser = await User.findOneAndDelete({ _id: userId });
    if (!deleteUser) {
      return res.status(404).json({ error: 'User Not found'});
    }

    res.json(deleteUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Aquí puedes agregar más funciones para obtener, actualizar o eliminar usuarios.

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
  // Agrega aquí más funciones si es necesario.
};
