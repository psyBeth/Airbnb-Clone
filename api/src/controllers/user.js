'use strict'

const User = require('../models/user');

module.exports = {
    list: async (req, res) => {

        const data = await res.getModelList(User, [])   //!!! listing  and pagination file

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User, []), //!!
            data
        });

    },

    create: async (req, res) => {

    },

    read: async (req, res) => {

    },

    update: async (req, res) => {

    },

    delete: async (req, res) => {

    }

};