'use strict'

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

}, {
    collection: "users",
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);