import { fs } from 'fs'
import { config } from './config.json'

let validate;
let update;

class Config {
	constructor(){
		this.port = config.port;
		this.bodyLimit = config.bodyLimit;
		this.corsHeaders = config.corsHeaders;
		this.format = config.format;
		this.filter = config.filter;
	}

	async update: (data, cb) => {
		fs.writeFile('./config.json', data, (err) => { 
			return cb(err, data);
		});
	}
}

export default Config