import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import stream from './twstream';
import config from './config.json';


stream.listen();

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// internal middleware
app.use(middleware({ config }));

// api router
app.use('/api', api({ config }));

app.server.listen(process.env.PORT || config.port);

console.log(`Started on port ${app.server.address().port}`);