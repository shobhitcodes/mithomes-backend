'use strict';

const mongoose = require('mongoose');
const user = require('./user');
const property = require('./property');
const Schema = mongoose.Schema;

const whishListSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: user },
        propertyId: { type: mongoose.Types.ObjectId, ref: property },
    },
    { timestamps: true, collection: 'whish-list' }
);

module.exports = mongoose.model('WhishList', whishListSchema);
