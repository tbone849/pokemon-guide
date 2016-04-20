angular.module('pokemon')
	.factory('PokemonSpeciesFactory', ['$http', function($http){

		var parseHabitat = function(data){
			if(data === null){
				return null;
			} else {
				return data.name;
			}
		};

		return {
			getSpecies: function(url){
				return $http.get(url);
			},

			parseSpecies: function(data){
				var species = {
					genderRate: data.gender_rate,
					captureRate: data.capture_rate,
					growthRate: data.growth_rate.name,
					color: data.color.name,
					evolutionChainUrl: data.evolution_chain.url,
					generation: data.generation.name,
					habitat: parseHabitat(data.habitat),
					genus: data.genera.genus,
					varieties: data.varieties
				};
	
				return species;
			}
		};
	}]);