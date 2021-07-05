const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

const config = require('./config/db');                      // Export db config file

const app = express();                                      // Initiate app
const port = 3000;                                          // Set port

mongoose.connect(config.db, {                               // Try connect to db
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () =>{
    console.log("Connect to db: successful");               // Print a message if connection successed
});
mongoose.connection.on('error', (err) =>{
    console.log("Connect to db: failed");                   // Print a message if connection failed
    console.log("Error: " + err);
});

app.use(
    express.static(path.join(__dirname, 'public')),         // Add to 'app' static folder 'public'
    cors(),                                                 // Add CORS support 
    bodyParser.json()                                       // Add bodyParser
);

app.get('/', (req, res) => {                                // Simple response if '/' address will be open
    res.send('Hello!');
});

app.listen(port, () => {                                    // Start listen port
    console.log("Server will be serve on port: " + port)    // Print a massege
});