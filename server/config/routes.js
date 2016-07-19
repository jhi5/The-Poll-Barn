var auth = require('./auth'),
	users = require('../controllers/users'),
	polls = require('../controllers/polls'),
	mongoose = require('mongoose'),
	User = mongoose.model("User");

module.exports = function(app){


	//users
	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	app.post('/api/users', users.createUser);
	app.put('/api/users', users.updateUser);

	//polls
	app.get('/api/polls', polls.getPolls);
	app.get('/api/polls/:id', polls.getPollById);
	app.post('/api/newpoll/', polls.newPoll);
	app.post('/api/vote/', polls.newVote);
	app.post('/api/deletepoll/', polls.deletePoll);
	app.post('/api/addNewOptions/', polls.addNewOptions);

	app.get('/partials/*', function(req, res){
		res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function(req, res){
		req.logout();
		res.end();
	});

	app.all('/api/*', function(req, res){
		res.send(404);
	})

	app.get('*', function(req, res){
		res.render('index', {
			bootstrappedUser: req.user
		});
	});

}