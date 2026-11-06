const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const {
  authenticateToken,
  checkRole,
} = require("../middlewares/auth.middleware");
const ROLES = require("../utils/constants");

// Crear proyecto
router.post(
  "/",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.createProject,
);
router.post(
  "/create",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.createProject,
);

router.get(
  "/",
  authenticateToken,
  checkRole([ROLES.ADMIN, ROLES.USER]),
  projectController.getAllProjects,
);
router.get(
  "/user/:userId",
  authenticateToken,
  checkRole([ROLES.ADMIN, ROLES.USER]),
  projectController.getProjectsByUserId,
);
router.post(
  "/assign",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.assignUsersToProject,
);
router.delete(
  "/remove",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.removeUserFromProject,
);

// Actualizar proyecto
router.put(
  "/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.updateProject,
);
router.put(
  "/update/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.updateProject,
);

// Eliminar proyecto
router.delete(
  "/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.deleteProject,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN]),
  projectController.deleteProject,
);
router.get(
  "/:id",
  authenticateToken,
  checkRole([ROLES.ADMIN, ROLES.USER]),
  projectController.getProjectById,
);

module.exports = router;
