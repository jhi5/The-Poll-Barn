angular.module('app', ['ngResource', 'ngRoute', 'googlechart', 'angular-ui.bootstrap.modal']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	var routeRoleChecks = {
		admin: {
			auth: function(mvAuth) {
				return mvAuth.authorizedCurrentUserForRoute('admin')
			}
		},
		user: {
			auth: function(mvAuth){
				return mvAuth.authorizeAuthenticatedUserForRoute()
			}
		}
	}
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/', {
		templateUrl: '/partials/main/main',
		controller: "mvMainCtrl"
	})
	.when('/admin/users', {
		templateUrl: '/partials/admin/user-list',
		controller: "mvUserListCtrl",
		resolve: routeRoleChecks.admin
	})
	.when('/signup', {
		templateUrl: '/partials/account/signup',
		controller: 'mvSignupCtrl'
	})
	.when('/profile', {
		templateUrl: '/partials/account/profile',
		controller: 'mvProfileCtrl',
		resolve: routeRoleChecks.user
	})
	.when('/yourpolls/', {
		templateUrl: '/partials/polls/your-polls',
		controller: 'mvYourPollsCtrl'
	})
	.when('/polls/newpoll', {
		templateUrl: '/partials/polls/newpoll',
		controller: "mvNewPollCtrl"
	})
	.when('/polls/:id', {
		templateUrl: '/partials/polls/poll-details',
		controller: 'mvPollDetailCtrl'
	})
	.when('/polls', {
		templateUrl: '/partials/polls/poll-list',
		controller: 'mvPollListCtrl'
	})
});

angular.module('app').run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/');
		}
	});
});