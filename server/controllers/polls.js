var Poll = require('mongoose').model("Polling");

exports.getPolls = function(req, res){
	Poll.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

//add logic to redirect window on find failure
exports.getPollById = function(req, res){
	console.log(req.params.id);
	Poll.findOne({_id:req.params.id}).exec(function(err, poll){
		res.send(poll);
	})
};

exports.newPoll = function(req, res){
	console.log(req.body);
	var pollData = req.body;
	Poll.create(pollData, function(err, data){
		if(err){
			if(err.toString().indexOf('E11000') > -1){
				err = new Error("Duplicate Username");
			}
			console.log(err.toString());
			res.status(400);
			return res.send({reason:err.toString()});
		}
		res.send(pollData);
	})
};

exports.newVote = function(req, res){
	console.log(req.body.pollId);
	Poll.findOne({_id:req.body.pollId}).exec(function(err, poll){
		poll.options[req.body.vote - 1].votes++;
		poll.markModified("options");
		poll.save();
		console.log(poll);
		res.send(poll);
	})
};

exports.deletePoll = function(req, res){
	console.log(req.body);
	Poll.remove({_id: req.body.pollId}).exec(function(err, poll){
		if(err){
			console.log(err);
		}else{
			res.status(200);
			return res.send(poll);
		}
	});
};

exports.addNewOptions = function(req, res){
	Poll.findOne({_id:req.body.pollId}).exec(function(err, poll){
		poll.options.push({"choice": req.body.newOption, "votes": 0, "id": poll.options.length + 1});
		poll.markModified("options");
		poll.save();
		console.log(poll);
		res.send(poll);
	})
}