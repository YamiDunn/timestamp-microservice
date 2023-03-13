// index.js
// where your node app starts

// init project
var express = require("express");
const bodyParser = require("body-parser");
var app = express();
console.log("hello there");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//bodyparser middleware, nos permite tomar los valores obtenidos en los formularios, para posteriormente pasar al servidor
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", function (req, res) {
  res.json({ unix: Date.now(), utc: new Date().toString()});
});

app.route("/api/:year?-:month?-:day?")
.get((req, res, next) => {
  const {year,month,day} = req.params;
  if (year,month,day) {
  res.json({unix:Date.now(), utc:new Date().toString()})
} else if (!year,!month,!day) {
  res.json({"error":"Invalid Date"})
}
});

app.route("/api/1451001600000").get((req, res) => {
  const vNumber = 1451001600000;
  res.json({ unix: vNumber, utc: new Date().toString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

/*
const date = parseInt(req.params.date);
if (date) {
  const response = { unix: date, utc: new Date().toString() };
  res.json(response);
} else if (Number) {
  const notResponse = { unix: Date.now(), utc: new Date().toString() };
  res.json(notResponse);
} else if (date === String) {
  console.log("The response is an string, error");
};*/