import { version } from '../../package.json';
import { Router } from 'express';
import { config } from './config'

export default ({ config }) => {
	let api = Router();

	// mount the facets resource
	api.post('/listener/config', function(req, res){
		let body = req.body;
		config.update(body, function(err, data){
			res.json(data);
		});
	});

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}