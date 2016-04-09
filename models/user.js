var mongoose = require('mongoose');
var validate = require('mongoose-validator').validate;
var timestamp = require('mongoose-timestamp');
  //, passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
	fb: {
		id: String,
		access_token: String,
		displayName: String,
		email: String
	},
  isAdmin: Boolean
});
UserSchema.plugin(timestamp);

//User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

