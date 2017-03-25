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
				resolve(config);
			}else{
				reject('No config availble');
			}
		}) 
	}
}

export default Config