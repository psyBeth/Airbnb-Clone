'use strict'

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {

    },

    firstName: {

    },

    lastName: {

    },

    email: {

    },

    password: {

    },

    isActive: {

    },

}, {
    collection: "users",
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);