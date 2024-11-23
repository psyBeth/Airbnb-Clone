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

        // for the new records 
        // auto login token will be here

        const data = await User.create(req.body);

        res.status(201).send({
            error: false,
            data
        });

    },

    read: async (req, res) => {

        if(!req.user) {
            return res.status(401).send({ error: true, message: "Unauthorized" });
        };

        res.status(200).send({
            error: false,
            data
        });

    },

    update: async (req, res) => {

        if(!req.user) {
            return res.status(401).send({ error: true, message: "Unauthorized" });
        };
        
        

    },

    delete: async (req, res) => {

    }

};