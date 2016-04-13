angular.module('pokemon', ['ngAnimate', 'angular-velocity', 'ngRoute', 'ngLodash'])
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
				controller: 'PokemonNameController'
			}).
			when('/pokemon/:name', {
				templateUrl: 'views/pokemon-detail.html',
				controller: 'PokemonDetailController'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);