var mongoose = require('mongoose');
var validate = require('mongoose-validator').validate;
  //, passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
	fb: {
		id: String,
		access_token: String,
		displayName: String,
		email: String
	},
  time: Date,
});

//User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

