'use strict';

const mongoose = require('mongoose');
const user = require('./user');
const property = require('./property');
const Schema = mongoose.Schema;

const leadSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: user },
        propertyId: { type: mongoose.Types.ObjectId, ref: property },
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true, collection: 'lead' }
);

module.exports = mongoose.model('Lead', leadSchema);
