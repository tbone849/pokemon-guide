angular.module('pokemon')
	.factory('PokemonNameFactory', ['$http', 'lodash', function($http, lodash){

		var capitalizeStrings = function(strings){
			var results = strings.map(function(string){
				return lodash.capitalize(string.name);
			});

			return results;
		};

		return {
			getAllNames: function(callback){
				$http.get('//pokeapi.co/api/v2/pokemon/')
					.then(function(res){
						var count = res.data.count;
						$http.get('//pokeapi.co/api/v2/pokemon/?limit=' + count)
							.then(function(res){
								callback(null, capitalizeStrings(res.data.results));
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