var winston        = require('winston');
var S3StreamLogger = require('s3-streamlogger').S3StreamLogger;

var s3_stream = new S3StreamLogger({
	bucket: "streams.twitter",
	access_key_id: "AKIAI4T6RWNCJNFRSXGA",
	secret_access_key: "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"
});

var logger = new (winston.Logger)({
  transports: [
  	new (winston.transports.Console)(),
    new (winston.transports.File)({
      stream: s3_stream
    })
  ]
});

module.exports = logger;