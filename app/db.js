var mongoose = require('mongoose');

var tweventSchema = mongoose.Schema({
	event: String,
	text: String
});
var tweventModel = mongoose.model('twevent', tweventSchema);

function save(data, cb){
	var twevent = new tweventModel(data);
	twevent.save(cb);
}

module.exports = {
	save: save
}