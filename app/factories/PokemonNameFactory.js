angular.module('pokemon')
	.factory('PokemonNameFactory', ['$http', 'lodash', function($http, lodash){

		var getNames = function(creatures){
			var results = creatures.map(function(pokemon){
				return pokemon.name;
			});

			return results;
		};

		return {
			getAllNames: function(callback){
				$http.get('//pokeapi.co/api/v2/pokemon/', {cache:true})
					.then(function(res){
						var count = res.data.count;
						$http.get('//pokeapi.co/api/v2/pokemon/?limit=' + count, {cache:true})
							.then(function(res){
								callback(null, getNames(res.data.results));
							})
							.then(function(err){
								callback(err);
							});
					})
					.then(function(err){
						callback(err);
					});
			}
		};
	}]);