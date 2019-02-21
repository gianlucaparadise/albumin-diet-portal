/**
 * from: https://devcenter.heroku.com/articles/mean-apps-restful-api#finalize-deployment-configuration-and-deploy-to-heroku
 * 
 * This is to run the website on Heroku
 */

const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
const distDir = __dirname + "/../dist/";
app.use(express.static(distDir));

app.get('/*', function (req, res) {
  res.sendFile(path.join(distDir, '/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);