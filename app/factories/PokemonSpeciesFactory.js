angular.module('pokemon')
	.factory('PokemonSpeciesFactory', ['$http', function($http){

		var parseHabitat = function(data){
			if(data === null){
				return null;
			} else {
				return data.name;
			}
		};

		var parseGender = function(data){
			if(data === -1){
				return {
					male: null,
					female: null,
					genderless: 'Genderless'
				};
			} else {
				return {
					male: Math.floor(((8 - data) / 8) * 100) + '%',
					female: Math.floor((data / 8) * 100) + '%',
					genderless: false
				};
			}
		};


		return {
			getSpecies: function(url){
				return $http.get(url, {cache:true});
			},

			parseSpecies: function(data){
				var species = {
					name: data.name,
					genderRate: parseGender(data.gender_rate),
					captureRate: data.capture_rate,
					growthRate: data.growth_rate.name,
					color: data.color.name,
					evolutionChainUrl: data.evolution_chain.url,
					generation: data.generation.name,
					habitat: parseHabitat(data.habitat) || 'unavailable',
					genus: data.genera[0].genus,
					varieties: data.varieties
				};

				console.log(data.gender_rate);
	
				return species;
			}
		};
	}]);