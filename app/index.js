var express = require('express')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitter');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	var app = express();
	app.get('/', function (req, res) {
	  res.send('Hello World!')
	})

	app.listen(3000, function () {
	  console.log('Example app listening on port 3000!')
	})
});