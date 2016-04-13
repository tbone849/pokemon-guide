angular.module('pokemon')
	.factory('PokemonEvolutionFactory', ['$http', function($http){

		var parseEvolutionChain = function(data){
			var chain = [];
			if(data.chain.evolves_to.length === 0){
				chain = [data.chain.species.name];
			} else if(data.chain.evolves_to.evolves_to === 0) {
				chain = [
					data.chain.species.name, 
					data.chain.evolves_to.species.name
				];
			} else {
				chain = [
					data.chain.species.name,
					data.chain.evolves_to.species.name,
					data.chain.evolves_to.evolves_to.species.name
				];
			}

			return chain;
			
		};

		return {
			getEvolutionChain: function(id, callback){
				$http.get('//pokeapi.co/api/v2/evolution-chain/' + id)
					.then(function(res){
						callback(null, parseEvolutionChain(res.data));
					})
					.then(function(err){
						callback(err);
					});
			}
		};

	}]);