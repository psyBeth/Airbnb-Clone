'use strict'

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },

    firstName: {
        type: String,
        trim: true,
        required: true,
    },

    lastName: {
        type: String,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true,
        // validate: ... (validation - pre(save))
    },

    password: {
        type: String,
        trim: true,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

}, {
    collection: "users",
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);