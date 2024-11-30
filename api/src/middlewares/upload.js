'use strict'

// app.use(upload.array('fieldName'));
//! INTEGRATE

const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({
        destination:'./upload',
        filename: function(req, file, returnCallback) {
            returnCallback(null, file.originalname)
        }
    })
});