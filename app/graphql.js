var { graphql } = require('graphql');
const { Schema } = require('./schema');


function execute(data, cb){
	var query = `{tweet{      
      text,
      user {
        name
      }
	}}`;
	graphql(Schema, query).then((response) => {
		cb(response);
	})
	.catch((error) => {
	    console.log(error);
	});
}

module.exports = {
	execute: execute
}
