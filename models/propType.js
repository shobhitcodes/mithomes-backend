'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropTypeSchema = new Schema(
    {
        name: { type: String }, // villa, land, flat
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true, collection: 'prop_type' }
);

module.exports = mongoose.model('PropType', PropTypeSchema);
