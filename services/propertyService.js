'use strict';

// model imports
const Property = require('../models/property');

// public interface
module.exports.getById = getById;
module.exports.getByUserId = getByUserId;
module.exports.getByProjectId = getByProjectId;
module.exports.getAll = getAll;
module.exports.create = create;
module.exports.update = update;
module.exports.deleteOne = deleteOne;

async function getById(id) {
    try {
        if (!id) throw 'id missing';

        const property = await Property.findById(id);
        return property;
    } catch (err) {
        console.error('Error on getById property service: ', err);
        throw err;
    }
}

async function getByUserId(id) {
    try {
        if (!id) throw 'id missing';

        const properties = await Property.find({ userId: id });
        return properties;
    } catch (err) {
        console.error('Error on getByUserId property service: ', err);
        throw err;
    }
}

async function getByProjectId(id) {
    try {
        if (!id) throw 'id missing';

        const properties = await Property.find({ projectId: id });
        return properties;
    } catch (err) {
        console.error('Error on getByUserId property service: ', err);
        throw err;
    }
}

async function getAll() {
    try {
        const properties = await Property.find();
        return properties;
    } catch (err) {
        console.error('Error on getAll property service: ', err);
        throw err;
    }
}

async function create(property) {
    try {
        if (!property) throw 'data missing';

        property = new Property(property);
        property = await property.save();

        return property;
    } catch (err) {
        console.error('Error on create property service: ', err);
        throw err;
    }
}

async function update(id, property) {
    try {
        if (!id || !property) throw 'required data missing';

        property = await Property.findByIdAndUpdate(id, property, {
            new: true,
        });

        if (!property) throw 'property not found';

        return property;
    } catch (err) {
        console.error('Error on create property service: ', err);
        throw err;
    }
}

async function deleteOne(id) {
    try {
        if (!id) throw 'id missing';

        return await Property.findByIdAndDelete(id);
    } catch (err) {
        console.error('Error on deleteOne property service: ', err);
        throw err;
    }
}
