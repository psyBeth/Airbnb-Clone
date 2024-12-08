'use strict'

const User = require('../models/user');
const Token = require('../models/token');
const passwordEncrypt = require('../helpers/passwordEncrypt');

module.exports = {
    
    login: async (req, res) => {

    },

    refresh: async (req, res) => {

    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Token: Logout"
            #swagger.description = 'Delete token-key.'
        */       
       
        const auth = req.header?.authorization || null;  // Token ...tokenKey... // Bearer ...accessToken...
        const tokenKey = auth ? auth.split(' ') : null;  // ['Token', '...tokenKey...'] // ['Bearer', '...accessToken...']

        let message = null, result = {};

        if(tokenKey && tokenKey[0] == 'Token') {
            result = await Token.deleteOne({token: tokenKey[1]});
            message = 'Token deleted, logout OK.'
        }

        res.send({
            error: false,
            message,
            result
        });
    }

};