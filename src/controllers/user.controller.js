const userService = require("../services/user.service");

exports.createUser = async (req, res, next) => {
  try {
    const {
      nombre = "Admin Principal",
      email = "admin@gmail.com",
      password = "admin123",
      rol_id = 1,
      administrador_id = null,
    } = req.body || {};

    const user = await userService.createUser(
      nombre,
      email,
      password,
      rol_id,
      administrador_id,
    );
    res.status(201).json({ message: "Usuario creado con éxito", user });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, email, rol_id, administrador_id } = req.body || {};
    const admin_from_token = req.user.id;
    const user = await userService.updateUser(
      id,
      nombre,
      email,
      rol_id,
      administrador_id,
      admin_from_token,
    );
    res.status(200).json({ message: "Usuario actualizado con éxito", user });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin_from_token = req.user.id;
    const response = await userService.deleteUser(id, admin_from_token);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getAllUsersByAdministradorId = async (req, res, next) => {
  try {
    const administrador_id = req.user.id;
    const { email } = req.query;
    const users = await userService.getAllUsersByAdministradorId(
      administrador_id,
      email,
    );
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.getAllUsersByRolId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await userService.getAllUsersByRolId(id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
