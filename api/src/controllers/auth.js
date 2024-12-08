'use strict'

const User = require('../models/user');
const Token = require('../models/token');
const passwordEncrypt = require('../helpers/passwordEncrypt');

module.exports = {
    
    login: async (req, res) => {

        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get Token and JWT.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */

        const { username, email, password } = req.body;

        if((username || email) && password) {

            const user = await User.findOne({ $or: [{ username }, { email }]});

            if(user && user.password == passwordEncrypt(password)) {

                if(user.isActive) {

                    let tokenData = await Token.findOne({ userId: user._id });

                    if(!tokenData) tokenData = await Token.create({
                        userId: user._id,
                        token: passwordEncrypt(user._id + Date.now())
                    })

                } else {
                    res.errorStatusCode = 401;
                    throw new Error('This account is not active.');
                }

            } else {
                res.errorStatusCode = 401;
                throw new Error('Wrong username/email or password.')
            }

        } else {
            res.errorStatusCode = 401;
            throw new Error('Please enter username/email and password.');
        }
    },

    refresh: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'JWT: Refresh'
            #swagger.description = 'Refresh access-token by refresh-token.'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    bearer: {
                        refresh: '___refreshToken___'
                    }
                }
            }
        */

        
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