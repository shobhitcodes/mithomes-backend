'use strict';

const utils = require('../helpers/utils');
const builderService = require('../services/builderService');

// public interface
module.exports.getById = getById;
module.exports.getAll = getAll;
module.exports.create = create;
module.exports.update = update;
module.exports.deleteOne = deleteOne;
module.exports.getByUserId = getByUserId

/**
 * @async
 * @description Request handler for fetching builders
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function getAll(req, res) {
    try {
        const builders = await builderService.getAll();
        res.json(utils.formatResponse(1, builders));
    } catch (err) {
        console.error('Error on builder getAll handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for fetching builder
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function getById(req, res) {
    try {
        const { id } = req.params;
        const builder = await builderService.getById(id);
        res.json(utils.formatResponse(1, builder));
    } catch (err) {
        console.error('Error on builder getById handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for create builder
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function create(req, res) {
    try {
        const data = req.body;
        const { _id: userId } = req.user;
        data.userId = userId;
        const builder = await builderService.create(data);
        res.json(utils.formatResponse(1, builder));
    } catch (err) {
        console.error('Error on builder create handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for update builder
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function update(req, res) {
    try {
        const { id } = req.params;
        let builder = req.body;
        builder = await builderService.update(id, builder);
        res.json(utils.formatResponse(1, builder));
    } catch (err) {
        console.error('Error on builder update handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for delete builder
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function deleteOne(req, res) {
    try {
        const { id } = req.params;
        await builderService.deleteOne(id);
        res.json(utils.formatResponse(1));
    } catch (err) {
        console.error('Error on builder deleteOne handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for fetching builders by userId
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function getByUserId(req, res) {
    try {
        const { id } = req.params;
        const builders = await builderService.getByUserId(id);
        res.json(utils.formatResponse(1, builders));
    } catch (err) {
        console.error('Error on builder getByUserId handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}
