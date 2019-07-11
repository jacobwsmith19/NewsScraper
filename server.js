// Dependencies
const express = require("express");
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose"); 
const request = require("request"); 
const cheerio = require("cheerio"); 

// Require models
const db = require("./models");

// Port configuration 
const PORT = process.env.PORT || process.argv[2] || 8080;

// Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Controllers
const router = require("./controller/controller.js");
app.use(router);

// Connect to the MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the MongoDB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function () {
    console.log(`App is running on port: ${PORT}`);
});