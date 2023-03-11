'use strict';

const utils = require('../helpers/utils');
const resellerService = require('../services/resellerService');

// public interface
module.exports.getByUserId = getByUserId;
module.exports.update = update;
module.exports.createLead = createLead;
module.exports.getLeadsByPropertyId = getLeadsByPropertyId;
module.exports.getLeads = getLeads;
module.exports.getAllLeads = getAllLeads;
module.exports.createListingRequest = createListingRequest;
module.exports.getAllListingRequests = getAllListingRequests;
module.exports.markListingRequestComplete = markListingRequestComplete;
module.exports.getWhishList = getWhishList;
module.exports.addFavourite = addFavourite;
module.exports.removeFavourite = removeFavourite;

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

async function createLead(req, res) {
    try {
        const { propertyId } = req.params;
        const { _id: userId } = req.user;
        await resellerService.createLead(userId, propertyId);
        res.json(utils.formatResponse(1));
    } catch (err) {
        console.error('Error on reseller createLead handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

async function getLeadsByPropertyId(req, res) {
    try {
        const { propertyId } = req.params;
        const leads = await resellerService.getLeadsByPropertyId(propertyId);
        res.json(utils.formatResponse(1, leads));
    } catch (err) {
        console.error('Error on reseller getLeadsByPropertyId handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

async function getLeads(req, res) {
    try {
        const { _id: userId } = req.user;
        const leads = await resellerService.getLeads(userId);
        res.json(utils.formatResponse(1, leads));
    } catch (err) {
        console.error('Error on reseller getLeads handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

async function getAllLeads(req, res) {
    try {
        const leads = await resellerService.getAllLeads();
        res.json(utils.formatResponse(1, leads));
    } catch (err) {
        console.error('Error on reseller getAllLeads handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

async function createListingRequest(req, res) {
    try {
        const { _id: userId } = req.user;
        await resellerService.createListingRequest(userId);
        res.json(utils.formatResponse(1));
    } catch (err) {
        console.error('Error on reseller createListingRequest handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

async function getAllListingRequests(req, res) {
    try {
        const listingRequests = await resellerService.getAllListingRequests();
        res.json(utils.formatResponse(1, listingRequests));
    } catch (err) {
        console.error('Error on reseller getAllListingRequests handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

async function markListingRequestComplete(req, res) {
    try {
        const { listingId } = req.params;
        await resellerService.markListingRequestComplete(listingId);
        res.json(utils.formatResponse(1));
    } catch (err) {
        console.error(
            'Error on reseller markListingRequestComplete handler: ',
            err
        );
        res.json(utils.formatResponse(0, err));
    }
}

async function getWhishList(req, res) {
    try {
        const { _id: userId } = req.user;
        const whishList = await resellerService.getWhishList(userId);
        res.json(utils.formatResponse(1, whishList));
    } catch (err) {
        console.error('Error on reseller getWhishList handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}

async function addFavourite(req, res) {
    try {
        const { propertyId } = req.params;
        const { _id: userId } = req.user;
        await resellerService.addFavourite(userId, propertyId);
        res.json(utils.formatResponse(1));
    } catch (err) {
        console.error('Error on reseller addFavourite handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}
async function removeFavourite(req, res) {
    try {
        const { propertyId } = req.params;
        const { _id: userId } = req.user;
        await resellerService.removeFavourite(userId, propertyId);
        res.json(utils.formatResponse(1));
    } catch (err) {
        console.error('Error on reseller removeFavourite handler: ', err);
        res.json(utils.formatResponse(0, err));
    }
}
