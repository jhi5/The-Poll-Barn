angular.module('app').controller('mvPollListCtrl', function($scope, $timeout, $location, mvCachedPolls, mvIdentity) {
	$scope.identity = mvIdentity;
	mvCachedPolls.query().$promise.then(function(collection){
		$scope.polls = collection;
    });

	$scope.sortOptions = [{
		value: 'title',
		text: "Sort by Title"
	}, {
		value: "date",
		text: "Sort by Creation Date"
	}, {
		value: "createdBy",
		text: "Sort by Creator"
	}]
	$scope.sortOrder = $scope.sortOptions[0].value;
});