'use strict'

const Token = require('../models/token');

module.exports = async (req, res, next) => {
    const auth = req.headers?.authorization || null;  // Token ...tokenKey... // Bearer ...accessToken...
    const tokenKey = auth ? auth.split(' ') : null;  // ['Token', '...tokenKey...'] // ['Bearer', '...accessToken...']

    if (tokenKey && tokenKey[0] === 'Token') {

        //! Simple Token
        const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId');
        req.user = tokenData ? tokenData.userId : undefined;
        
    };

    nixt();
}