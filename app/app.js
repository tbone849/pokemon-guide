angular.module('pokemon', ['ngAnimate', 'angular-velocity', 'ngRoute', 'ngLodash'])
	.config(['$routeProvider', '$sceDelegateProvider', function($routeProvider, $sceDelegateProvider){
		$routeProvider.
			when('/', {
				templateUrl: 'views/home.html',
				controller: 'HomeController'
			}).
			when('/pokemon', {
				templateUrl: 'views/browse.html',
				controller: 'BrowseController'
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

		$sceDelegateProvider.resourceUrlWhitelist([
    		// Allow same origin resource loads.
    		'self',
    		// Allow loading from our assets domain.  Notice the difference between * and **.
    		'http://pokeapi.co/api/v2/**'
  		]);
	}]);