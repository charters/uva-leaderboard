var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('process.env.MONGOLAB_URI');

var counselorSchema = new Schema({
	name: String,
	camp_name: String,
	url: String,
	amount_raised: Number
});

var Counselor = mongoose.model('Counselor', counselorSchema);

module.exports = Counselor;