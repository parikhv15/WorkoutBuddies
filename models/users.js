/**
 * Created by parikhv on 9/26/16.
 */
var mongoose = require('mongoose');

// To generate password hash
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

module.exports = mongoose.model('User',userSchema);
