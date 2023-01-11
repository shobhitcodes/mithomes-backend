'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const floorPlanSchema = new Schema(
    {
        projectId: Schema.Types.ObjectId,
        propertyId: Schema.Types.ObjectId,
        path: String,
        meta: Schema.Types.Mixed,
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true, collection: 'floor_plan' }
);

module.exports = mongoose.model('FsloorPlan', floorPlanSchema);
