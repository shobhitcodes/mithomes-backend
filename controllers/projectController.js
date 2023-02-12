'use strict';

const utils = require('../helpers/utils');
const projectService = require('../services/projectService');

// public interface
module.exports.getById = getById;
module.exports.getByUserId = getByUserId;
module.exports.getAll = getAll;
module.exports.create = create;
module.exports.update = update;
module.exports.deleteOne = deleteOne;

/**
 * @async
 * @description Request handler for fetching projects
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function getAll(req, res) {
    try {
        const projects = await projectService.getAll();
        res.json(utils.formatResponse(1, projects));
    } catch (err) {
        console.error('Error on project getAll handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for fetching project
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function getById(req, res) {
    try {
        const { id } = req.params;
        const project = await projectService.getById(id);
        res.json(utils.formatResponse(1, project));
    } catch (err) {
        console.error('Error on project getById handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for fetching projects by userId
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function getByUserId(req, res) {
    try {
        const { id } = req.params;
        const projects = await projectService.getByUserId(id);
        res.json(utils.formatResponse(1, projects));
    } catch (err) {
        console.error('Error on project getByUserId handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for create project
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function create(req, res) {
    try {
        const data = req.body;
        const { _id: userId } = req.user;
        data.userId = userId;
        const project = await projectService.create(data);
        res.json(utils.formatResponse(1, project));
    } catch (err) {
        console.error('Error on project create handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for update project
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function update(req, res) {
    try {
        const { id } = req.params;
        let project = req.body;
        project = await projectService.update(id, project);
        res.json(utils.formatResponse(1, project));
    } catch (err) {
        console.error('Error on project update handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for delete project
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function deleteOne(req, res) {
    try {
        const { id } = req.params;
        await projectService.deleteOne(id);
        res.json(utils.formatResponse(1));
    } catch (err) {
        console.error('Error on project deleteOne handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}
