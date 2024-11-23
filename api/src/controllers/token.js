'use strict'

const Token = require('../models/token');

module.exports = {

    list: async(req, res) => {

        const data = await res.getModelList(Token);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Token),
            data
        });
    },

    create: async(req, res) => {

        const data = await Token.create(req.body);

        res.status(201).send({
            error: false,
            data
        });
    },

    read: async(req, res) => {

    },

    update: async(req, res) => {

    },

    delete: async(req, res) => {

    }
}