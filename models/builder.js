'use strict';

const mongoose = require('mongoose');
const user = require('./user');

const Schema = mongoose.Schema;

const builderSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: user },
        name: { type: String },
        logo: { type: String },
        businessSince: { type: Date },
        about: { type: String },
        info: {
            operatingStates: [String],
            operatingCities: [String],
            reraRegistered: Boolean,
            govRegistered: Boolean,
            certified: Boolean,
            permission: Boolean,
        },
        kyc: {
            aadhaar: {
                number: String,
                image: String,
            },
            pan: {
                number: String,
                image: String,
            },
            gst: String,
        },
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true, collection: 'builder' }
);

module.exports = mongoose.model('Builder', builderSchema);
