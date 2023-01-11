'use strict';

const mongoose = require('mongoose');
const city = require('./city');
const Schema = mongoose.Schema;

const CitySchema = new Schema(
    {
        name: { type: String },
        cityId: { type: mongoose.Types.ObjectId, ref: city },
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true, collection: 'locality' }
);

module.exports = mongoose.model('Locality', CitySchema);
