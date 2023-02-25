'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        name: { type: String },
        userId: { type: mongoose.Types.ObjectId },
        // cityId: { type: mongoose.Types.ObjectId },
        // localityId: { type: mongoose.Types.ObjectId },
        city: String,
        locality: String,
        type: String,
        location: { type: String },
        launchedDate: { type: Date },
        description: { type: String },
        coordinates: Schema.Types.Mixed, // { lat, lng }
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
        meta: Schema.Types.Mixed,
        localityDetails: {
            city: String,
            locality: Number,
            street: Number,
            lat: String,
            lng: String,
            other: String,
        }, 
    },
    { timestamps: true, collection: 'project' }
);

module.exports = mongoose.model('Project', projectSchema);
