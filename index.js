// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
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

app.get("/api", function (req, res) {
  res.json({ unix: Date.now(), utc: new Date() });
});

app.route("/api/:date?").get((req, res) => {
  let date = req.params.date;
  let unixDate;
  let dateObj;
  let utcDate;
  //Using regex.text, check since stars if "date" has digits until the end.
  let isUnix = /^\d+$/.test(date);
  // if it is a number, parseint (converte or pass it as a number type)
  if (isUnix) {
    unixDate = parseInt(date);
    dateObj = new Date(unixDate);
  } else if (!isUnix) {
    dateObj = new Date(date);
    unixDate = dateObj.getTime();
  };
 if (dateObj.toString() === "Invalid Date") {
    res.json({error: "Invalid Date"});
    return;
  }
  utcDate = dateObj.toUTCString();
  res.json({ unix: unixDate, utc: utcDate });
});

/*app.route("/api/1451001600000").get((req, res) => {
  const vNumber = 1451001600000;
  res.json({ unix: vNumber, utc: new Date().toString() });
});*/

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
