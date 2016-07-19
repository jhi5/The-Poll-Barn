angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, $location, mvIdentity, mvNotifier, mvAuth){
	$scope.identity = mvIdentity;
	$scope.signin = function (username, password){
		mvAuth.authenticateUser(username, password).then(function(success){
			if(success){
				mvNotifier.notify("You did it!");
			}else{
				mvNotifier.notify("Couldn't sign-in.");
			}
			$location.path('/');
		});
		
	};
	$scope.signout = function() {
		mvAuth.logoutUser().then(function(){
			$scope.username = "";
			$scope.password = "";
			mvNotifier.notify("You have successfully signed out!");
			$location.path('/');
		})
	};	
});