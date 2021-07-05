const express = require("express");
const Cors = require("cors");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

const app = express(); // Initiate app
const port = 3000;     // Set port

app.listen(port, () => {                                 // Start listen port
    console.log("Server will be serve on port: " + port) // Type init massege
});

