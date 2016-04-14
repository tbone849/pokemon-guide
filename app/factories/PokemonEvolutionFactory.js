angular.module('pokemon')
	.factory('PokemonEvolutionFactory', ['$http', function($http){

		var parseEvolutionChain = function(data){

			if(data.chain.evolves_to.length === 0){
				return [data.chain.species.name];
			} else if(data.chain.evolves_to[0].evolves_to.length === 0 && 
				data.chain.evolves_to.length > 0) {
				return [
					data.chain.species.name, 
					data.chain.evolves_to[0].species.name
				];
			} else {
				return [
					data.chain.species.name,
					data.chain.evolves_to[0].species.name,
					data.chain.evolves_to[0].evolves_to[0].species.name
				];
			}
			
		};

		return {
			getEvolutionChain: function(url, callback){
				$http.get(url)
					.then(function(res){
						callback(null, parseEvolutionChain(res.data));
					})
					.then(function(err){
						callback(err);
					});
			}
		};

	}]);