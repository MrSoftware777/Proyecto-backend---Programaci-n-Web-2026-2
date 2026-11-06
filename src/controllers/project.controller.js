const projectService = require("../services/project.service");
const ROLES = require("../utils/constants");

exports.createProject = async (req, res, next) => {
  try {
    const data = { ...req.body, administrador_id: req.user.id };
    const project = await projectService.createProject(data);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

exports.getProjectsByUserId = async (req, res, next) => {
  try {
    const projects = await projectService.getProjectsByUserId(
      req.params.userId,
    );
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

exports.assignUsersToProject = async (req, res, next) => {
  try {
    const result = await projectService.assignUsersToProject(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.removeUserFromProject = async (req, res, next) => {
  try {
    const result = await projectService.removeUserFromProject(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject({
      id: req.params.id,
      ...req.body,
    });
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const result = await projectService.deleteProject(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(
      req.params.id,
      req.user.id,
    );
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};
