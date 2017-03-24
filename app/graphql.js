var { graphql } = require('graphql');
const { Schema } = require('./schema');
const { config } = require ('./config.json');


export const execute = (data, cb) => {
	var query = `{tweet(id:"${data}")${config.listener.format}}`;
	return graphql(Schema, query);
}
