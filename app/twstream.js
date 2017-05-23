var Twitter = require('twitter');
var twittercli = require('./twitter-cli');
var graphql = require('./graphql');
var logger = require('./logger');
var config = require('./config.json');

function listen(cb){
	var client = new Twitter(config.twitter);
	var stream = client.stream('statuses/filter', {track: config.listener.filter});
	stream.on('data', function(event) {
		twittercli.addTweet(event);
		graphql.execute(event.id)
		.then((result)=> {
			logger.info(result);
		})
		.catch((err)=>{
			throw err;
		})
	});
	 
	stream.on('error', function(error) {
		console.log(error);
	  throw error;
	});
}

module.exports = {
	listen: listen
}