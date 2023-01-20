'use strict';
const mongoose = require('mongoose');
const user = require('./user');
const Schema = mongoose.Schema;

const userAuthSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: user },
        otp: String,
        mobileNo: String,
        used: { type: Boolean, default: false },
        type: {
            type: String,
            enum: ['login', 'register', 'passwordChange'],
            default: 'login',
        },
        active: { type: Boolean, default: true },
        meta: Schema.Types.Mixed,
    },
    { timestamps: true, collection: 'userAuth' }
);
module.exports = mongoose.model('UserAuth', userAuthSchema);
