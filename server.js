var express = require("express");
//var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8080;
var values = [];

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.end(values.join("\n"));
});

app.post('/data', function(req, res){
	var value = req.query.value;
	values.push(value);
  console.log(values);
	res.end(value);
});

app.listen(port, function () {
  console.log('App listening on port', port);
});
