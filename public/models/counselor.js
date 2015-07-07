var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uriUtil = require('mongodb-uri');
console.log(process.env.MONGOLAB_URI);
var mongodbUri = process.env.MONGOLAB_URI;

var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri);

var counselorSchema = new Schema({
	name: String,
	camp_name: String,
	url: String,
	amount_raised: Number
});

var Counselor = mongoose.model('counselors', counselorSchema);

module.exports = Counselor;