var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var dotenv = require('dotenv').config({path: "main.env"});

var app = express();
var port = process.env.PORT || 8080;
//var url = "mongodb://bvanzwienen:arduinoFree@ds042379.mlab.com:42379/arduino";
var url = process.env.DB_URL;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://codepen.io/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req, res){
  res.end("Try /getData to get data.");
});

app.get('/getData', function(req, res) {
  getData(function(docs){
    res.send(docs);
    res.end("");
  });
});

app.post('/data', function(req, res){
  var value = req.query.value;
  saveData(value);
	res.end("");
});

app.listen(port, function () {
  console.log('App listening on port', port);
});


function getData(callback){
  MongoClient.connect(url, function(err, db){
    var collection = db.collection("test");

    collection.find({}).toArray(function(err, docs){
      callback(docs);
    });

    db.close();
  });
}

function saveData(val){
  MongoClient.connect(url, function(err, db){
    var collection = db.collection("test");

    collection.insert({
      value: val
    });

    db.close();
  });
}
