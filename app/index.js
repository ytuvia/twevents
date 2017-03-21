var express = require('express');
var stream = require('./twstream');
//var sqs = require('./sqs');
//var graphql = require('./graphql');

/*sqs.listen(function(err, data){
	graphql.execute(data.id, function(result){
	  	console.log(result);
	});
})*/
stream.listen();