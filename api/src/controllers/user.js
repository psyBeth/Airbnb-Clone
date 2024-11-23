'use strict'

//! Swaggers will be added
const User = require('../models/user');

module.exports = {

    list: async (req, res) => {

        // can only see their own records:
        const customFilters = req.user?.isAdmin ? {} : {_id: req.user.id};

        const data = await res.getModelList(User, customFilters);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User, customFilters),
            data
        });

    },

    create: async (req, res) => {

        // for the new records  //! warning
        req.body.isStaff = false;
        req.body.isAdmin = false;

        const data = await User.create(req.body);

        // auto login token will be here

        res.status(201).send({
            error: false,
            data
        });

    },

    read: async (req, res) => {

        if(!req.user) {
            return res.status(401).send({ error: true, message: "Unauthorized" });
        };

        const customFilters = req.user?.isAdmin ? {_id: req.params.id} : {_id: req.user.id};

        const data = await User.findOne(customFilters);

        res.status(200).send({
            error: false,
            data
        });

    },

    update: async (req, res) => {

        if(!req.user) {
            return res.status(401).send({ error: true, message: "Unauthorized" });
        };
        
        const customFilters = req.user?.isAdmin ? {_id: req.params.id} : {_id: req.user.id};

        //! here: do not allow changing admin/staff

        const data = await User.updateOne(customFilters, req.body, {runValidators: true});
        const newData = await User.findOne(customFilters);

        res.status(202).send({
            error: false,
            data,
            newData
        })
    },

    delete: async (req, res) => {

    }

};