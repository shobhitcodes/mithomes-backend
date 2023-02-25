'use strict';

// model imports
const Builder = require('../models/builder');

// public interface
module.exports.getById = getById;
module.exports.getByUserId = getByUserId;
module.exports.getAll = getAll;
module.exports.create = create;
module.exports.update = update;
module.exports.deleteOne = deleteOne;

async function getById(id) {
    try {
        if (!id) throw 'id missing';

        const builder = await Builder.findById(id);
        return builder;
    } catch (err) {
        console.error('Error on getById builder service: ', err);
        throw err;
    }
}

async function getByUserId(id) {
    try {
        if (!id) throw 'id missing';

        const builders = await Builder.find({ userId: id });
        return builders;
    } catch (err) {
        console.error('Error on getByUserId builder service: ', err);
        throw err;
    }
}

async function getAll() {
    try {
        const builders = await Builder.find();
        return builders;
    } catch (err) {
        console.error('Error on getAll builder service: ', err);
        throw err;
    }
}

async function create(builder) {
    try {
        if (!builder) throw 'data missing';

        builder = new Builder(builder);
        builder = await builder.save();

        return builder;
    } catch (err) {
        console.error('Error on create builder service: ', err);
        throw err;
    }
}

async function update(id, builder) {
    try {
        if (!id || !builder) throw 'required data missing';

        builder = await Builder.findByIdAndUpdate(id, builder, {
            new: true,
        });

        if (!builder) throw 'builder not found';

        return builder;
    } catch (err) {
        console.error('Error on create builder service: ', err);
        throw err;
    }
}

async function deleteOne(id) {
    try {
        if (!id) throw 'id missing';

        return await Builder.findByIdAndDelete(id);
    } catch (err) {
        console.error('Error on deleteOne builder service: ', err);
        throw err;
    }
}
