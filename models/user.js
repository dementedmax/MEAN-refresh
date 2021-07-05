const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/db");

const UserSchema = mongoose.Schema({                                // Data schema for user's
    name: { type: String },
    email: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);   // Export schema

module.exports.getUserByLogin = function (login, callback) {        // Function for search user by login
    const query = { login: login };                                 // Set query body
    User.findOne(query, callback);                                  // Send query
};
module.exports.getUserByLogin = function (id, callback) {           // Function for search user by id
    User.findById(id, callback);                                    // Send query. There is no need for an additional variable because there have search function by ID
};

module.exports.addUser = function (newUser, callback) {             // Function for generate 'salt'
    bcrypt.genSalt(                                                 // Function for make hash from password string
        10,                                                         // Number of 'salt' symbols
        (err, salt) => {
            if (err) throw err;
            bcrypt.hash(                                            // Actually hash function
                newUser.password,                                   // The string from which the hash is generated
                salt,                                               // 'Salt' from parent function
                (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;                        // Replace password to a hash
                    newUser.save(callback);                         // Actually add new user. Finally
                });
        });
};

module.exports.comparePass = function(passFromUser, userDBpass, callback){
    bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};
