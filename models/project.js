'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        name: { type: String },
        cityId: { type: mongoose.Types.ObjectId },
        localityId: { type: mongoose.Types.ObjectId },
        location: { type: String },
        launchedDate: { type: Date },
        description: { type: String },
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true, collection: 'project' }
);

module.exports = mongoose.model('Project', projectSchema);
