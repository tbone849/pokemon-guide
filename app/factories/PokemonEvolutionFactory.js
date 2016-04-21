angular.module('pokemon')
	.factory('PokemonEvolutionFactory', ['$http', function($http){

		return {
			getEvolutionChain: function(url){
				return $http.get(url, {cache:true});
			}
		};

	}]);