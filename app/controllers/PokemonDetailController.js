angular.module('pokemon')
	.controller('PokemonDetailController', ['$scope', 'PokemonDetailFactory', 
	'PokemonEvolutionFactory', 'PokemonSpeciesFactory', '$routeParams', '$http', function($scope, PokemonDetailFactory, PokemonEvolutionFactory, PokemonSpeciesFactory, $routeParams, $http){

			$scope.name = $routeParams.name;
			// get details
			PokemonDetailFactory.getDetails($scope.name, function(err, res){
				if(err){
					return console.log(err);
				}

				if(res !== undefined){
					$scope.foundDetails = true;
					$scope.pokemon = res;
					//console.log($scope.pokemon);
				}

				// get species
				PokemonSpeciesFactory.getSpecies($scope.pokemon.species.url, function(err, res){
					if(err){
						return console.log(err);
					}

					if(res !== undefined){
						$scope.species = res;
						//console.log($scope.species);

						// get evolution
						PokemonEvolutionFactory.getEvolutionChain(res.evolutionChainUrl, function(err, res){
							if(err){
								return console.log(err);
							}

							if(res !== undefined){
								$scope.evolution = res;
								console.log($scope.evolution);
							}

						});
					}
				});

			});

			// move to directive.
			$scope.getPokemonImage = function(name){

				return $http.get('//pokeapi.co/api/v2/pokemon/' + name + '/')
					.then(function(res){
						return 'http://pokeapi.co/media/sprites/pokemon/' + res.data.id + '.png';
					})
					.then(function(err){
						return 'notfound';
					});
			};

	}]);
