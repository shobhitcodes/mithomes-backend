'use strict';

// model imports
const Reseller = require('../models/reseller');
const Lead = require('../models/lead');
const ListingRequest = require('../models/listingRequest');
const WhishList = require('../models/whishList');

// public interface
module.exports.create = create;
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

async function create(reseller) {
    try {
        if (!reseller) throw 'required data missing';

        reseller = new Reseller(reseller);
        reseller = await reseller.save();
        return reseller;
    } catch (err) {
        console.error('Error on create reseller service: ', err);
        throw err;
    }
}

async function getByUserId(id) {
    try {
        if (!id) throw 'id missing';

        const reseller = await Reseller.find({ userId: id });
        return reseller;
    } catch (err) {
        console.error('Error on getByUserId reseller service: ', err);
        throw err;
    }
}

async function update(id, reseller) {
    try {
        if (!id || !reseller) throw 'required data missing';

        reseller = await Reseller.findByIdAndUpdate(id, reseller, {
            new: true,
        });

        if (!reseller) throw 'reseller not found';

        return reseller;
    } catch (err) {
        console.error('Error on update reseller service: ', err);
        throw err;
    }
}

async function createLead(userId, propertyId) {
    try {
        if (!userId || !propertyId) throw 'required data missing';

        let lead = new Lead({ userId, propertyId });
        await lead.save();

        return lead;
    } catch (err) {
        console.error('Error on update createLead service: ', err);
        throw err;
    }
}

async function getLeadsByPropertyId(propertyId) {
    try {
        if (!propertyId) throw 'required data missing';

        return Lead.find({ propertyId });
    } catch (err) {
        console.error('Error on getLeadsByPropertyId reseller service: ', err);
        throw err;
    }
}

async function getLeads(userId) {
    try {
        if (!userId) throw 'required data missing';

        return Lead.find({ userId });
    } catch (err) {
        console.error('Error on getLeads reseller service: ', err);
        throw err;
    }
}

async function getAllLeads() {
    try {
        return Lead.find();
    } catch (err) {
        console.error('Error on getAllLeads reseller service: ', err);
        throw err;
    }
}

async function createListingRequest(userId) {
    try {
        if (!userId) throw 'required data missing';

        let listingRequest = new ListingRequest({ userId });
        listingRequest = await listingRequest.save();
        return listingRequest;
    } catch (err) {
        console.error('Error on createListingRequest reseller service: ', err);
        throw err;
    }
}

async function getAllListingRequests() {
    try {
        return ListingRequest.find();
    } catch (err) {
        console.error('Error on getAllListingRequests reseller service: ', err);
        throw err;
    }
}

async function markListingRequestComplete(listingId) {
    try {
        if (!listingId) throw 'required data missing';

        return ListingRequest.findByIdAndUpdate(
            listingId,
            { completed: true },
            {
                new: true,
            }
        );
    } catch (err) {
        console.error(
            'Error on markListingRequestComplete reseller service: ',
            err
        );
        throw err;
    }
}

async function getWhishList(userId) {
    try {
        if (!userId) throw 'required data missing';

        return WhishList.find({ userId });
    } catch (err) {
        console.error('Error on getWhishList reseller service: ', err);
        throw err;
    }
}

async function addFavourite(userId, propertyId) {
    try {
        if (!userId || !propertyId) throw 'required data missing';

        const alreadyFavourite = (await WhishList.find({ userId, propertyId }))
            .length;

        if (alreadyFavourite) throw 'Already present in whishlist';

        const whishList = new WhishList({ userId, propertyId });
        return whishList.save();
    } catch (err) {
        console.error('Error on addFavourite reseller service: ', err);
        throw err;
    }
}

async function removeFavourite(userId, propertyId) {
    try {
        if (!userId || !propertyId) throw 'required data missing';

        return WhishList.deleteOne({ userId, propertyId});
    } catch (err) {
        console.error('Error on removeFavourite reseller service: ', err);
        throw err;
    }
}
