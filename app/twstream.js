var Twitter = require('twitter');
var db = require('./db');

function listen(cb){
	var client = new Twitter({
	  consumer_key: '',
	  consumer_secret: '',
	  access_token_key: '',
	  access_token_secret: ''
	});
	var stream = client.stream('statuses/filter', {track: 'javascript'});
	stream.on('data', function(event) {
	  console.log(event && event.text);
	  db.save({
	  	event: event,
	  	text: event.text
	  }, function(err){
	  	if (err) {throw err;}
	  });
	});
	 
	stream.on('error', function(error) {
	  throw error;
	});
}

module.exports = {
	listen: listen
}