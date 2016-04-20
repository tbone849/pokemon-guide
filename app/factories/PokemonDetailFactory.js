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

		var parseHeightToFeet = function(height){
			var inches = Math.round(height / 2.54);
			var feet = (inches / 12).toFixed(1);

			return feet + ' ft';
		};

		var parseWeightToLbs = function(weight){
			var lbs = ((weight/10) * 2.2046).toFixed(2);
			return lbs + ' lbs';
		};


		return {
			getDetails: function(name){
				return $http.get('//pokeapi.co/api/v2/pokemon/' + name + '/', {cache:true});
			},

			parsePersonalTraits: function(traits){
				var pokemon = {
					height: {
						ft: parseHeightToFeet(traits.height*10),
						m: (traits.height / 10).toFixed(2) + ' m'
					},
					weight: {
						lbs: parseWeightToLbs(traits.weight),
						kg: (traits.weight / 10).toFixed(2) + ' kg'
					},
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