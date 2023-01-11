'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema(
    {
        name: { type: String },
        projectId: Schema.Types.ObjectId,
        propertyId: Schema.Types.ObjectId,
        fileType: String, // jpeg, png, mp4
        contentType: String, // video, photo
        path: String,
        meta: Schema.Types.Mixed,
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true, collection: 'file' }
);

module.exports = mongoose.model('File', fileSchema);
