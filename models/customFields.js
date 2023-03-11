'use strict';

const mongoose = require('mongoose');
const { getAll } = require('../services/userService');
const Schema = mongoose.Schema;

const fieldObj = {
    label: String,
    key: String,
    values: String,
};

const customFieldSchema = new Schema(
    {
        fields: fieldObj,
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true, collection: 'custom_field' }
);

module.exports = mongoose.model('CustomField', customFieldSchema);
