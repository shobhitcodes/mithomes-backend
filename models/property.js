'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema(
    {
        name: { type: String },
        userId: { type: mongoose.Types.ObjectId },
        projectId: { type: mongoose.Types.ObjectId },
        typeId: { type: mongoose.Types.ObjectId },
        cityId: { type: mongoose.Types.ObjectId },
        localityId: { type: mongoose.Types.ObjectId },
        locality: String,
        type: String,
        location: { type: String },
        description: { type: String },
        availableType: { type: String },
        availableDate: { type: Date },
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
        meta: Schema.Types.Mixed, // bedroom, bathroom, car-parking
    },
    { timestamps: true, collection: 'property' }
);

module.exports = mongoose.model('Property', propertySchema);
