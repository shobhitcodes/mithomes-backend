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
        type: String,
        ownershipType: String,
        bhkType: String,
        plotArea: Number, // in sq.ft
        builtUpArea: Number, // in sq.ft
        carpetArea: Number, // in sq.ft
        propertyAge: String,
        facing: String, // direction
        floorType: String,
        floor: String,
        totalFloor: Number,
        location: { type: String },
        description: { type: String },
        availableType: { type: String },
        availableDate: { type: Date },
        active: { type: Boolean, default: true },
        deleted: { type: Boolean, default: false },
        meta: Schema.Types.Mixed, // bedroom, bathroom, car-parking
        amenities: {
            gym: Boolean,
            swimmingPool: Boolean,
            intercom: Boolean,
            shoppingCenter: Boolean,
            clubHouse: Boolean,
            lift: Boolean,
            playArea: Boolean,
            gasPipeline: Boolean,
            gatedSecurity: Boolean,
            fireSafety: Boolean,
            park: Boolean,
            internetProvider: Boolean,
            laundry: Boolean,
            modularKitchen: Boolean,
            smokeDetection: Boolean,
        },
        localityDetails: {
            city: String,
            locality: Number,
            street: Number,
            lat: String,
            lng: String,
            other: String,
        },
        priceDetails: {
            expectedPrice: Number,
            negotiable: Boolean,
            underLoan: Boolean,
        },
        details: {
            waterSupply: String,
            bathroom: Number,
            balcony: Number,
            propertyShower: String,
            powerBackup: String,
            directionTipDesc: String,
            kitchenType: String,
            furnishingType: String,
            parking: String,
            propDesc: String,
        },
    },
    { timestamps: true, collection: 'property' }
);

module.exports = mongoose.model('Property', propertySchema);
