'use strict';

// model imports
const Property = require('../models/property');

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

async function getByFilter(filter = {}) {
    try {
        const {
            city,
            availableType,
            locality,
            type,
            range,
            recent,
            limit,
            projectId,
            projection,
        } = filter;
        const findFilter = { active: true };

        city && (findFilter['localityDetails.city'] = city);
        availableType && (findFilter.availableType = availableType);
        locality && (findFilter['localityDetails.locality'] = locality);
        type && (findFilter.type = type);
        range &&
            (findFilter['priceDetails.expectedPrice'] = {
                $gte: range.from || 0,
                $lte: range.to || 10000000000,
            });
        projectId && (findFilter.projectId = projectId);
        projectId && (findFilter.projectId = projectId);

        let propertyQuery = Property.find(findFilter);

        if (projection) propertyQuery = propertyQuery.select(projection);
        if (recent) propertyQuery = propertyQuery.sort({ _id: -1 });
        if (limit) propertyQuery = propertyQuery.limit(limit);

        const properties = await propertyQuery;
        return properties;
    } catch (err) {
        console.error('Error on getByFilter property service: ', err);
        throw err;
    }
}

async function getCity(city) {
    try {
        const propQuery = {};

        if (city) propQuery['localityDetails.city'] = city;

        const properties = await Property.find(propQuery);
        return properties;
    } catch (err) {
        console.error('Error on getCity property service: ', err);
        throw err;
    }
}

async function getByType(type) {
    try {
        const propQuery = {};

        if (type) propQuery.type = type;

        const properties = await Property.find(propQuery);
        return properties;
    } catch (err) {
        console.error('Error on getByType property service: ', err);
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
