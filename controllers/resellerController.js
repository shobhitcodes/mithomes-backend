'use strict';

const utils = require('../helpers/utils');
const resellerService = require('../services/resellerService');

// public interface
module.exports.getByUserId = getByUserId;
module.exports.update = update;

/**
 * @async
 * @description Request handler for fetching reseller by userId
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function getByUserId(req, res) {
    try {
        const { id } = req.params;
        const reseller = await resellerService.getByUserId(id);
        res.json(utils.formatResponse(1, reseller));
    } catch (err) {
        console.error('Error on reseller getByUserId handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

/**
 * @async
 * @description Request handler for update reseller
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function update(req, res) {
    try {
        const { id } = req.params;
        let reseller = req.body;
        reseller = await resellerService.update(id, reseller);
        res.json(utils.formatResponse(1, reseller));
    } catch (err) {
        console.error('Error on reseller update handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}
