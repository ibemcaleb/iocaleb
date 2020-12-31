var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var route = require("./routes/routes");

require("dotenv").config();

var app = express();

var hostname = process.env.HOSTNAME;
var port = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(route);

app.listen(port, hostname, () => {
    console.log(`Server started and listening on http://${hostname}:${port}/`);
});