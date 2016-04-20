angular.module('pokemon')
	.controller('PokemonDetailController', ['$scope', 'PokemonDetailFactory', 
	'PokemonEvolutionFactory', 'PokemonSpeciesFactory', '$routeParams', '$http', function($scope, PokemonDetailFactory, PokemonEvolutionFactory, PokemonSpeciesFactory, $routeParams, $http){

			$scope.name = $routeParams.name;

			// detail, then species (res.species.url), then evolution (res.evolutionChainUrl)

			PokemonDetailFactory.getDetails($scope.name)
				.then(function(res){
					$scope.foundDetails = true;
					$scope.pokemon = PokemonDetailFactory.parsePersonalTraits(res.data);
					return PokemonSpeciesFactory.getSpecies($scope.pokemon.species.url);
				}, function(err){
					console.log('Details failed: ' + err);
				})
				.then(function(res){
					$scope.species = PokemonSpeciesFactory.parseSpecies(res.data);
					return PokemonEvolutionFactory.getEvolutionChain($scope.species.evolutionChainUrl);
				}, function(err){
					console.log('Species failed: ' + err);
				})
				.then(function(res){
					$scope.evolution = res.data;
				}, function(err){
					console.log('Evolution failed: ' + err);
				});
	}]);
