const express = require("express");
const router = express.Router();
const User = require('../models/user');

router.get('/reg', (req, res) => {                     
    res.send('Registration page');
});
router.get('/auth', (req, res) => {                    
    res.send('Auth page');
});
router.get('/dashboard', (req, res) => {               
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

module.exports = router;