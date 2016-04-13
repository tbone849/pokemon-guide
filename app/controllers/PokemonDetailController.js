angular.module('pokemon')
	.controller('PokemonDetailController', ['$scope', 'PokemonDetailFactory', 
	'PokemonEvolutionFactory', '$routeParams', function($scope, PokemonDetailFactory, PokemonEvolutionFactory, $routeParams){

			$scope.name = $routeParams.name;
			PokemonDetailFactory.getDetails($scope.name, function(err, res){
				if(err){
					return console.log(err);
				}

				if(res !== undefined){
					$scope.foundDetails = true;
					$scope.pokemon = res;
					console.log($scope.pokemon);
					PokemonEvolutionFactory.getEvolutionChain(res.id, function(err, res){
						if(err){
							return console.log(err);
						}

						$scope.evolutionChain = res;
						console.log($scope.evolutionChain);
					});
				}
			});
	}]);
