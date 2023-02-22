'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const resellerSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId },
        builderName: { type: String },
        businessSince: { type: Date },
        about: { type: String },
        builderInfo: {
            operatingStates: [String],
            operatingCities: [String],
            reraRegistered: Boolean,
            govRegistered: Boolean,
            certified: Boolean,
            randomFlag: Boolean,
        },
        kyc : {
            aadhaar: {
                number: String,
                image: String,
            },
            pan: {
                number: String,
                image: String,
            },
            gst: String
        },
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true, collection: 'reseller' }
);

module.exports = mongoose.model('Reseller', resellerSchema);
