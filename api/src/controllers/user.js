'use strict'

const { hashPassword, verifyPassword } = require('../helpers/passwordEncrypt');
const Token = require('../models/token');
const User = require('../models/user');

module.exports = {

    list: async (req, res) => {

        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

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

        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */

        // for the new records  //! warning
        req.body.isStaff = false;
        req.body.isAdmin = false;

        const { hash, salt } = hashPassword(req.body.password);
        req.body.passwordHash = hash;
        req.body.passwordSalt = salt;

        const data = await User.create(req.body);

        // auto login:
        const tokenData = await Token.create({
            userId: data._id,
            token: passwordEncrypt(data._id + Date.now())
        })

        res.status(201).send({
            error: false,
            token: tokenData.token,
            data
        });

    },

    read: async (req, res) => {

        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
            
        */

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

        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */

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

        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

        if(req.params.id.toString() !== req.user._id.toString()) {
            const data = await User.deleteOne({_id: req.params.id});

            res.status(data.deletedCount ? 204 : 404).send({
                error: !data.deletedCount,
                data
            });
        } else {
            // admin cannot delete themselves
            res.errorStatusCode = 403;
            throw new Error('You cannot remove your account.');
        };

    }

};