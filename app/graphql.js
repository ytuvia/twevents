var { graphql } = require('graphql');
const { Schema } = require('./schema');


function execute(data, cb){
	var query = `{tweet(id:"${data}"){      
      text,
      user {
        name,
        location,
        weather
      }
	}}`;
	graphql(Schema, query).then((response) => {
		cb(response);
	})
	.catch((error) => {
		throw error;
	});
}

module.exports = {
	execute: execute
}
