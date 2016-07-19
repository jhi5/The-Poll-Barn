angular.module('app').controller('mvNewPollCtrl', function($scope, $location, $http, $route, mvIdentity, mvNotifier){
	
	$scope.options = [{id: 1}, {id: 2}];

	$scope.addNewOption = function() {
		var newItemNo = $scope.options.length+1;
		$scope.options.push({'id':newItemNo});
	};

	$scope.showAddOption = function(option) {
		return option.id === $scope.options[$scope.options.length-1].id;
	};

	$scope.newPoll = function(){		
		$scope.options.forEach(function(obj){
			obj.votes = 0;
		});
		var curDate = new Date();
		var newPollData = {
			title: $scope.polltitle,
			options: $scope.options,
			createdBy: mvIdentity.currentUser.username,
			createdOn: curDate
		};
		$http.post("/api/newpoll/", newPollData).success(function(data, status) {
			if(data !== undefined){
				mvNotifier.notify("New Poll Created! Moving to all polls...");
          setTimeout(function(){window.location = '/polls';}, 1000);   
			}else{
				console.log("Data = undefined, status: " + status);
				mvNotifier.notify("Submission failed! Be sure to check your fields!");
			}
		});
	}
});