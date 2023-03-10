'use strict';

const utils = require('../helpers/utils');
const propertyService = require('../services/propertyService');

// public interface
module.exports.getById = getById;
module.exports.getByUserId = getByUserId;
module.exports.getByProjectId = getByProjectId;
module.exports.getCity = getCity;
module.exports.getByType = getByType;
module.exports.getByFilter = getByFilter;
module.exports.getAll = getAll;
module.exports.create = create;
module.exports.update = update;
module.exports.deleteOne = deleteOne;

/**
 * @async
 * @description Request handler for fetching properties
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function getAll(req, res) {
    try {
        const properties = await propertyService.getAll();
        res.json(utils.formatResponse(1, properties));
    } catch (err) {
        console.error('Error on property getAll handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for fetching property
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function getById(req, res) {
    try {
        const { id } = req.params;
        const property = await propertyService.getById(id);
        res.json(utils.formatResponse(1, property));
    } catch (err) {
        console.error('Error on property getById handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for fetching properties by userId
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function getByUserId(req, res) {
    try {
        const { id } = req.params;
        const properties = await propertyService.getByUserId(id);
        res.json(utils.formatResponse(1, properties));
    } catch (err) {
        console.error('Error on property getByUserId handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for fetching properties by projectId
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function getByProjectId(req, res) {
    try {
        const { id } = req.params;
        const properties = await propertyService.getByProjectId(id);
        res.json(utils.formatResponse(1, properties));
    } catch (err) {
        console.error('Error on property getByProjectId handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

async function getCity(req, res) {
    try {
        const { city } = req.body;
        const properties = await propertyService.getCity(city);
        res.json(utils.formatResponse(1, properties));
    } catch (err) {
        console.error('Error on property getCity handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

async function getByType(req, res) {
    try {
        const { type } = req.body;
        const properties = await propertyService.getByType(type);
        res.json(utils.formatResponse(1, properties));
    } catch (err) {
        console.error('Error on property getByType handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

async function getByFilter(req, res) {
    try {
        const filter = req.body;
        const properties = await propertyService.getByFilter(filter);
        res.json(utils.formatResponse(1, properties));
    } catch (err) {
        console.error('Error on property getByFilter handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for create property
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function create(req, res) {
    try {
        const data = req.body;
        const { _id: userId } = req.user;
        data.userId = userId;
        const property = await propertyService.create(data);
        res.json(utils.formatResponse(1, property));
    } catch (err) {
        console.error('Error on property create handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for update property
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function update(req, res) {
    try {
        const { id } = req.params;
        let property = req.body;
        property = await propertyService.update(id, property);
        res.json(utils.formatResponse(1, property));
    } catch (err) {
        console.error('Error on property update handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for delete property
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function deleteOne(req, res) {
    try {
        const { id } = req.params;
        await propertyService.deleteOne(id);
        res.json(utils.formatResponse(1));
    } catch (err) {
        console.error('Error on property deleteOne handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}
