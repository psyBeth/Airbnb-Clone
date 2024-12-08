'use strict'

// passwordEncrypt(password:string):

const { pbkdf2Sync, randomBytes } = require('node:crypto'),
    keyCode = process.env.SECRET_KEY,
    loopCount = 100000,
    charCount = 32,
    encType = 'sha512';

// module.exports = function (password) {
//     return pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString('hex')
// };

module.exports.hashPassword = function (password) {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString('hex');
    return { salt, hash};
};

module.exports.verifyPassword = function (password, storedHash, storedSalt) {
    const hash = pbkdf2Sync(password, storedSalt, loopCount, charCount, encType).toString('hex');
    return hash === storedHash; 
};