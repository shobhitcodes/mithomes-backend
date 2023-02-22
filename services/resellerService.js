'use strict';

// model imports
const Reseller = require('../models/reseller');

// public interface
module.exports.create = create;
module.exports.getByUserId = getByUserId;
module.exports.update = update;

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
ß