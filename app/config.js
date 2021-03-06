import { fs } from 'fs'
import { config } from './config.json'

class Config {
	constructor(){
		this.port = config.port;
		this.bodyLimit = config.bodyLimit;
		this.corsHeaders = config.corsHeaders;
		this.format = config.format;
		this.filter = config.filter;
	}

	update(data){
		return new Promise((resolve, reject) => {
			fs.writeFile('./config.json', data, (err) => { 
				if(err){
					reject(err);
				}else{
					resolve(data);
				}
			});
		})
	}

	get(){
		return new Promise((resolve, reject) => {
			if(config){
				config.twitter.consumer_key = process.env.TW_CONSUMER_KEY;
				config.twitter.consumer_secret =  process.env.TW_CONSUMER_SECRET;
				config.twitter.access_token_key = process.env.TW_ACCESS_TOKEN_KEY;
				config.twitter.access_token_secret = process.env.TW_ACCESS_TOKEN_SECRET;
				config.AWS.access_key_id = process.env.AWS_ACCESS_KEY_ID;
				config.AWS.secret_access_key = process.env.AWS_SECRET_ACCESS_KEY;

				resolve(config);
			}else{
				reject('No config availble');
			}
		}) 
	}
}

export default Config