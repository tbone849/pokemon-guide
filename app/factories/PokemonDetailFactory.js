angular.module('pokemon')
	.factory('PokemonDetailFactory', ['$http', function($http){

		var parseTypes = function(res){
			var types = res.map(function(value){
				return value.type.name;
			});
			return types;
		};

		var parseAbilities = function(res){
			var abilities = res.map(function(value){
				return value.ability.name;
			});
			return abilities;
		};


		return {
			getDetails: function(name){
				return $http.get('//pokeapi.co/api/v2/pokemon/' + name + '/', {cache:true});
			},

			parsePersonalTraits: function(traits){
				var pokemon = {
					height: traits.height,
					weight: traits.weight,
					type: parseTypes(traits.types),
					stats: traits.stats,
					abilities: parseAbilities(traits.abilities),
					species: traits.species,
					sprites: {
						male: traits.sprites.front_default,
						female: traits.sprites.front_female
					}
				};
				return pokemon;
			}
		};
	}]);