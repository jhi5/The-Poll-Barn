angular.module('app').factory('mvPolls', function($resource){
	var pollResource = $resource('/api/polls/:id', {_id: "@id"}, {
		update: {method: 'PUT', isArray:false},
	});
	return pollResource;
});