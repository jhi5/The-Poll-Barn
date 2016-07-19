angular.module('app').factory('mvCachedPolls', function(mvPolls){
	var pollList;
	return {
		query: function(){
			if(!pollList){
				pollList = mvPolls.query();
			}
			return pollList;
		}
	}
});