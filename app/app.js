angular.module('pokemon', ['ngAnimate', 'angular-velocity', 'ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.
			when('/', {
				templateUrl: 'views/home.html'
			}).
			when('/pokemon', {
				templateUrl: 'views/browse.html',
				controller: 'BrowseCtrl'
			}).
			when('/search', {
				templateUrl: 'views/search.html',
				controller: 'SearchCtrl'
			}).
			when('/pokemon/:name', {
				templateUrl: 'views/pokemon-detail.html',
				controller: 'PokemonDetailCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);