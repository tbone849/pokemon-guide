angular.module('pokemon')
	.controller('PokemonDetailController', ['$scope', 'PokemonDetailFactory', 
	'PokemonEvolutionFactory', 'PokemonSpeciesFactory', '$routeParams', function($scope, PokemonDetailFactory, PokemonEvolutionFactory, PokemonSpeciesFactory, $routeParams){

			$scope.name = $routeParams.name;
			// get details
			PokemonDetailFactory.getDetails($scope.name, function(err, res){
				if(err){
					return console.log(err);
				}

				if(res !== undefined){
					$scope.foundDetails = true;
					$scope.pokemon = res;
					console.log($scope.pokemon);
				}

				// get species
				PokemonSpeciesFactory.getSpecies($scope.pokemon.species.url, function(err, res){
					if(err){
						return console.log(err);
					}

					if(res !== undefined){
						$scope.species = res;
						console.log($scope.species);

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

	}]);
