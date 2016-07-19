var mongoose = require('mongoose');

var pollSchema = mongoose.Schema({
	title: {type: String, required:'{PATH} is required!'},
	options: {type: Array, required:'{PATH} is required!'},
	createdBy: {type: String, required: '{PATH} is required!'},
	createdOn: {type: Date, required: '{PATH} is required!'}
});

var Poll = mongoose.model("Polling", pollSchema);

function addNewPoll(data){
	Poll.find({}).exec(function(err, collection){
		if(collection.length === 0){
			Poll.create({title: data.title, options: data.options, createdBy: data.creator});
		}		
	});
}

exports.addNewPoll = addNewPoll;