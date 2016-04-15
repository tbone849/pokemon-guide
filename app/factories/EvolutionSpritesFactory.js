angular.module('pokemon')
	.factory('EvolutionSpritesFactory', ['$http', '$q', function($http, $q){

		var parseSprites = function(pokemon){
			var sprites = pokemon.map(function(name){
				return {
					name: name.data.name,
					png: name.data.sprites.front_default,

				};
			});

			return sprites;
		};

		return {
			getEvolutionSprites: function(pokemon, callback){

				var promises = pokemon.map(function(name){
					return $http.get('//pokeapi.co/api/v2/pokemon/' + name + '/');
				});

				$q.all(promises)
					.then(function(res){
						results = parseSprites(res);
						callback(null, results);
					})
					.then(function(err){
						callback(err);
					});
			}
		};
	}]);