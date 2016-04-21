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
					name: data.name,
					genderRate: {
						female: (data.gender_rate / 8).toFixed(1) * 100 + '%',
						male: ((8 - data.gender_rate) / 8).toFixed(1) * 100 + '%'
					},
					captureRate: data.capture_rate,
					growthRate: data.growth_rate.name,
					color: data.color.name,
					evolutionChainUrl: data.evolution_chain.url,
					generation: data.generation.name,
					habitat: parseHabitat(data.habitat) || 'unavailable',
					genus: data.genera[0].genus,
					varieties: data.varieties
				};
	
				return species;
			}
		};
	}]);