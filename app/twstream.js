var Twitter = require('twitter');
var twittercli = require('./twitter-cli');
var graphql = require('./graphql');
var logger = require('./logger');
//var sqs = require('./sqs');

function listen(cb){
	var client = new Twitter({
	  consumer_key: 'syrkIXRaJ4vx2eKGatihkD7cl',
	  consumer_secret: 'DayPwyKgGlssmaIsoU4Ur2H996zkqhoIGlS7BOfh48JAUsiXOO',
	  access_token_key: '18587521-WFW5L8gklunEh2mvQro0LG94OFBd5DDMwhdXocDBQ',
	  access_token_secret: '7E5b3HKXTmhGIt4kZr1rnWEaChbYAqs2CZFZccUNljgvm'
	});
	var stream = client.stream('statuses/filter', {track: 'Donald Trump'});
	stream.on('data', function(event) {
		twittercli.addTweet(event);
		graphql.execute(event.id, function(result){
		  	logger.info(result);
		});
	});
	 
	stream.on('error', function(error) {
	  throw error;
	});
}

module.exports = {
	listen: listen
}