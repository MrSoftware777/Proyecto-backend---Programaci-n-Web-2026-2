const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  authenticateToken,
  checkRole,
} = require("../middlewares/auth.middleware");
const ROLES = require("../utils/constants");

// Crear usuario
router.post("/", userController.createUser);
router.post("/create", userController.createUser);

// Actualizar usuario
router.put(
  "/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  userController.updateUser,
);
router.put(
  "/update/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  userController.updateUser,
);

// Eliminar usuario
router.delete(
  "/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  userController.deleteUser,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  userController.deleteUser,
);

// Obtener usuarios bajo administración
router.get(
  "/",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  userController.getAllUsersByAdministradorId,
);
router.get(
  "/admin",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  userController.getAllUsersByAdministradorId,
);

// Obtener usuarios por rol
router.get(
  "/rol/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  userController.getAllUsersByRolId,
);

module.exports = router;
