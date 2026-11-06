const Project = require("../models/project.model");
const User = require("../models/user.model");
const UserProject = require("../models/userProject.model");
const ROLES = require("../utils/constants");

exports.createProject = async (data) => {
  try {
    return await Project.create(data);
  } catch (err) {
    throw new Error(`Error al crear el proyecto: ${err.message}`);
  }
};

exports.getAllProjects = async () => {
  try {
    return await Project.findAll();
  } catch (err) {
    throw new Error(`Error al obtener los proyectos: ${err.message}`);
  }
};

exports.getProjectsByUserId = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Project,
        through: { attributes: [] },
        as: "proyectos",
      },
    });
    if (!user) throw new Error("Usuario no encontrado");
    return user.proyectos;
  } catch (err) {
    throw new Error(`Error al obtener proyectos del usuario: ${err.message}`);
  }
};

exports.assignUsersToProject = async (data) => {
  try {
    const usuario_id = data.usuario_id || data.userId || data.user_id;
    const proyecto_id = data.proyecto_id || data.projectId || data.project_id;

    if (!usuario_id || !proyecto_id) {
      throw new Error("Se requiere usuario_id (o userId) y proyecto_id (o projectId)");
    }

    return await UserProject.create({
      usuario_id,
      proyecto_id,
    });
  } catch (err) {
    throw new Error(`Error al asignar usuario al proyecto: ${err.message}`);
  }
};

exports.removeUserFromProject = async (data) => {
  try {
    const usuario_id = data.usuario_id || data.userId || data.user_id;
    const proyecto_id = data.proyecto_id || data.projectId || data.project_id;

    if (!usuario_id || !proyecto_id) {
      throw new Error("Se requiere usuario_id (o userId) y proyecto_id (o projectId)");
    }

    const result = await UserProject.destroy({
      where: {
        usuario_id,
        proyecto_id,
      },
    });
    if (result === 0) throw new Error("Asignación no encontrada");
    return { message: "Usuario removido del proyecto exitosamente" };
  } catch (err) {
    throw new Error(`Error al remover usuario del proyecto: ${err.message}`);
  }
};

exports.updateProject = async (data) => {
  try {
    const { id, ...updateData } = data;
    const project = await Project.findByPk(id);
    if (!project) throw new Error("Proyecto no encontrado");

    await project.update(updateData);
    return project;
  } catch (err) {
    throw new Error(`Error al actualizar el proyecto: ${err.message}`);
  }
};

exports.deleteProject = async (id) => {
  try {
    const project = await Project.findByPk(id);
    if (!project) throw new Error("Proyecto no encontrado");

    await project.destroy();
    return { message: "Proyecto eliminado con éxito" };
  } catch (err) {
    throw new Error(`Error al eliminar el proyecto: ${err.message}`);
  }
};

exports.getProjectById = async (id, userId) => {
  try {
    const project = await Project.findByPk(id);
    if (!project) throw new Error("Proyecto no encontrado");
    return project;
  } catch (err) {
    throw new Error(`Error al obtener el proyecto: ${err.message}`);
  }
};
