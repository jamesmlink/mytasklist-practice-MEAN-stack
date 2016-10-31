//set port number as variable
var port = 3030;

//import modules
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");


//link to routes
var index = require("./routes/index");
var tasks = require("./routes/tasks");


//create main app variable

var app = express();

//set view engine -- tell system views will be in views folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//set static folder to hold angular files
app.use(express.static(path.join(__dirname,"client")));

//setup body parser middleware (be able to parse json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//create routes
app.use("/",index);
app.use("/api",tasks);

//run server
app.listen(port, function(){
	console.log("server started on port " + port);
});