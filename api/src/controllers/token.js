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

        const data = await Token.findOne({_id: req.params.id});

        res.status(200).send({
            error: false,
            data
        });
    },

    update: async(req, res) => {
        
        const data = await Token.updateOne({_id: req.params.id}, req.body, {runValidators: true});
        const newData = await Token.findOne({_id: req.params.id});

        res.status(202).send({
            error: false,
            data,
            newData
        });
    },

    delete: async(req, res) => {

    }
}