angular.module('pokemon')
	.factory('BrowseFactory', ['$http', '$q', function($http, $q){
		return {
			getPokemon: function(pokemon){
				var promises = pokemon.map(function(value){
					return $http.get(value.url, {cache:true});
				});

				return $q.all(promises);
			}
		};
	}]);