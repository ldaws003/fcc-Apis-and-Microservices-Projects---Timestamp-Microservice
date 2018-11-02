// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/*", function(req, res){
  var timeToStamp = req.path.replace("/api/timestamp/", "");
  var timeStamp;
  var jsonSend;
  var unixDate;
  
  if(/\d{4}-\d{2}-\d{2}/.test(timeToStamp)){
    timeStamp = new Date(timeToStamp).toUTCString();
    unixDate = Math.round((new Date(timeToStamp)).getTime() / 1000);
    jsonSend = {
      "unix": unixDate,
      "utc": timeStamp
    };
  } else if(/^\d+$/.test(timeToStamp)) {
    unixDate = timeToStamp * 1000;
    timeStamp = new Date(unixDate).toUTCString();
    jsonSend = {
      "unix": unixDate,
      "utc": timeStamp
    };
  } else if (timeToStamp == ""){
    timeStamp = new Date().toUTCString();
    unixDate = Math.round((new Date()).getTime() / 1000);
    jsonSend = {
      "unix": unixDate,
      "utc": timeStamp
    };  
  } else {
    jsonSend = {"error" : "Invalid Date" };
  }
  
  res.json(jsonSend);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

