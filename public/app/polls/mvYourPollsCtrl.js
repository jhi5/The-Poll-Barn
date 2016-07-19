angular.module('app').controller('mvYourPollsCtrl', function($scope, $route, mvCachedPolls, mvIdentity) {
	$scope.polls = mvCachedPolls.query();
	$scope.currentUser = "none";
	if(mvIdentity.currentUser){
	$scope.currentUser = mvIdentity.currentUser.username;
	}

	$scope.userPolls = [];
	$scope.polls.forEach(function(poll){
		console.log(poll.createdBy);
		console.log($scope.currentUser);
		if(poll.createdBy === mvIdentity.currentUser.username){
			$scope.userPolls.push(poll); 
		}
	});

	$scope.sortOptions = [{
		value: 'title',
		text: "Sort by Title"
	}, {
		value: "date",
		text: "Sort by Creation Date"
	}]
	
	$scope.sortOrder = $scope.sortOptions[0].value;

});