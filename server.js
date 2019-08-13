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

app.get("/api/timestamp", function(req, res){
  res.json({"unix": new Date().getTime(), "utc": new Date().toUTCString()})
})

app.get("/api/timestamp/:date_string", function(req, res){
  var date_string = req.params.date_string
  console.log(Number(date_string).toString()===date_string)
  console.log('Number(date_string)', Number(date_string))
  console.log('toString(Number(date_string))', Number(date_string).toString())
  console.log(date_string)
  console.log(typeof date_string)
  // check if unixtimestamp
  if(Number(date_string).toString()===date_string){
    var unix_timestamp = date_string*1000
    var returnDate = new Date(unix_timestamp)
    if(returnDate){
       console.log(new Date(unix_timestamp))
       res.json({"unix": returnDate.getTime(), "utc": returnDate.toUTCString()})
    }else{
      res.json({"error" : "Invalid Date" })
    }
  }else if(new Date(date_string)){
    res.json({"unix": new Date(date_string).getTime(), "utc": new Date(date_string).toUTCString()})
  }else{
    res.json({"error" : "Invalid Date" })
  }
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});