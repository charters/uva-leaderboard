var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uriUtil = require('mongodb-uri');

var mongodbUri = process.env.MONGOLAB_URI;

var mongooseUri = uriUtil.formatMongoose(mongodbUri);

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 90000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 90000 } } };    

mongoose.connect(mongooseUri, options);

var counselorSchema = new Schema({
	name: String,
	camp_name: String,
	url: String,
	amount_raised: Number
});

var Counselor = mongoose.model('counselors', counselorSchema);

module.exports = Counselor;