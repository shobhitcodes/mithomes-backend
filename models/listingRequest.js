'use strict';

const mongoose = require('mongoose');
const user = require('./user');
const Schema = mongoose.Schema;

const listingRequestSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: user },
        completed: { type: Boolean, default: false },
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true, collection: 'listingRequest' }
);

module.exports = mongoose.model('ListingRequest', listingRequestSchema);
