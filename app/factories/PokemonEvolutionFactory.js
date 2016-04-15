angular.module('pokemon')
	.factory('PokemonEvolutionFactory', ['$http', function($http){

		return {
			getEvolutionChain: function(url, callback){
				$http.get(url)
					.then(function(res){
						callback(null, res.data);
					})
					.then(function(err){
						callback(err);
					});
			}
		};

	}]);