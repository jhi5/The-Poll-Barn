var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
	firstName: {type: String, required: '(PATH) is required!'},
	lastName: {type: String, required: '(PATH) is required!'},
	username: {type: String, required: '(PATH) is required!', unique: true},
	email: {type: String, required: '(PATH) is required', unique: true},
	salt: {type: String, required: '(PATH) is required!'},
	hashed_pwd: {type: String, required: '(PATH) is required!'},
	roles: [String]
});
userSchema.methods = {
	authenticate: function(passToMatch) {
		return encrypt.hashPwd(this.salt, passToMatch) === this.hashed_pwd;
	},
	hasRole: function(role){
		return this.roles.indexOf(role) > -1;
	}
}
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
	User.find({}).exec(function(err, collection) {
		if (collection.length === 0) {
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'Test');
			User.create({
				firstName: "Test",
				lastName: "Testy",
				username: "BigDog",
				email: "bigdog@romanreigns.com",
				salt: salt,
				hashed_pwd: hash,
				roles: ['admin']
			});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'Billy');
			User.create({
				firstName: "Billy",
				lastName: "Gunn",
				username: "Checkers",
				email: "mrass@billygunn.com",
				salt: salt,
				hashed_pwd: hash,
				roles: ['']
			});
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'Blue');
			User.create({
				firstName: "Blue",
				lastName: "Meanie",
				username: "Snackman",
				email: "bluemyself@bluemeanie.com",
				salt: salt,
				hashed_pwd: hash,
				roles: ['admin']
			});
		}
	});
}

exports.createDefaultUsers = createDefaultUsers;