const express = require("express");
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

router.get('/reg', (req, res) => {                     
    res.send('Registration page');
});
router.get('/auth', (req, res) => {                    
    res.send('Auth page');
});
router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {               
    res.send('User dashboard page');
});

router.post('/reg', (req, res) => {                     // Request for 'submit' button in registration form
    let newUser = new User({                            // Make new 'User' object by schema
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {              // Function for add new user from models/user.js
        if (err) 
            res.json({
                success: false, 
                msg:"User has not been added"
            });
        else
            res.json({
                success: true,
                msg:"User has been added"
            });
    });
});
router.post('/auth', (req, res) => {                    
    const login = req.body.login;                                                   // Get login
    const password = req.body.password;                                             // Get password
    
    User.getUserByLogin(login, (err, user) => {                                     // Try to find user
        if (err) throw err;

        if(!user)
            return res.json({
                success: false, 
                msg: "User not found"
            })
        
        User.comparePass(password, user.password, (err, isMatch) => {               // If user found compare login and encrypted passwords
            if(err) throw err;
            if(isMatch){                                                            
                const token = jwt.sign(user, config.secret, { expriseIn: 3600 });   // Make token for user
                
                res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        login: user.login,
                        email: user.email
                    }
                })

            } else {
                return res.json({
                    success: false, 
                    msg: "Invalid password"
                })
            }
        });
    });
});

module.exports = router;