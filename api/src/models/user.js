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

    isAdmin: {
        type: Boolean,
        default: false
    },

    isStaff: {
        type: Boolean,
        default: false
    }

}, {
    collection: "users",
    timestamps: true
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;