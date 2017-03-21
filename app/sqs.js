const consumer = require('sqs-consumer');
const AWS = require('aws-sdk');

AWS.config.loadFromPath('./aws.config.json');

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var queueURL = "https://sqs.us-west-2.amazonaws.com/480854784123/twitter.fifo";

var sendMessage = function(body, cb){
	var params = {
	  MessageDeduplicationId: body.id.toString(),
	  MessageGroupId: 'twitter-bucket',
	  MessageAttributes: {
	    "id": {
	      DataType: "Number",
	      StringValue: body.id.toString()
	    }
	 },
	 MessageBody: JSON.stringify(body),
	 QueueUrl: queueURL
	};

	sqs.sendMessage(params, function(err, data) {
	  cb(err, data);
	});
}

var reciveMessage = function(cb){
	var params = {
	 AttributeNames: [
	    "SentTimestamp"
	 ],
	 MaxNumberOfMessages: 1,
	 MessageAttributeNames: [
	    "All"
	 ],
	 QueueUrl: queueURL,
	 VisibilityTimeout: 0,
	 WaitTimeSeconds: 0
	};

	sqs.receiveMessage(params, function(err, data) {
	  cb(err, data);
	});
}

var listen = function(cb){
	const app = consumer.create({
	  queueUrl: queueURL,
	  handleMessage: (message, done) => {
	    done();
	    cb(null, message.Body);
	  },
	  sqs: new AWS.SQS()
	});

	app.on('error', (err) => {
	  cb(err.message);
	});

	app.start();
}

module.exports = {
	sendMessage: sendMessage,
	reciveMessage: reciveMessage,
	listen: listen
}