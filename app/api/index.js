import { version } from '../../package.json';
import { Router } from 'express';
import { Config } from '../config';

export default () => {
	let config = new Config();
	let api = Router();

	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.post('/configure', (req, res) => {
		let body = req.body;
		config.update(body).then((result)=>{
			res.json(data);
		}).catch((err)=>{
			res.status(500).send('server error');
		})
	});

	api.get('/configure', (req, res) => {
		config.get().then((result) => {
			res.json(data);
		}).catch((err) => {
			res.status(500).send('server error');
		})
	})

	return api;
}