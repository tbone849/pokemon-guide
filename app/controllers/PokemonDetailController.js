angular.module('pokemon')
	.controller('PokemonDetailController', ['$scope', 'PokemonDetailFactory', 
	'PokemonEvolutionFactory', 'PokemonSpeciesFactory', '$routeParams', function($scope, PokemonDetailFactory, PokemonEvolutionFactory, PokemonSpeciesFactory, $routeParams){

			$scope.name = $routeParams.name;
			var directiveImageLoadedCount = 0;
			var evolutionCount = 0;

			// get number of evolutions for image tracking
			var getEvolutionCount = function(evolution){
				var count = 1;
				for(i = 0; i < evolution.chain.evolves_to.length; i++){
					count++;
					for (z = 0; z < evolution.chain.evolves_to[i].evolves_to.length; z++){
						count++;
					}
				}
				return count;
			};

			$scope.areImagesLoaded = function(){
				directiveImageLoadedCount++;
				if(evolutionCount === directiveImageLoadedCount){
					$scope.$apply(function(){
						$scope.imagesLoaded = true;
					});
					console.log('images loaded. yay.');
				}

			};

			PokemonDetailFactory.getDetails($scope.name)
				// get basic pokemon stats
				.then(function(res){
					$scope.pokemon = PokemonDetailFactory.parsePersonalTraits(res.data);
					return PokemonSpeciesFactory.getSpecies($scope.pokemon.species.url);
				}, function(err){
					console.log('Details failed: ' + err);
				})
				// get species information
				.then(function(res){
					$scope.species = PokemonSpeciesFactory.parseSpecies(res.data);
					return PokemonEvolutionFactory.getEvolutionChain($scope.species.evolutionChainUrl);
				}, function(err){
					console.log('Species failed: ' + err);
				})
				// get evolution information
				.then(function(res){
					$scope.evolution = res.data;
					evolutionCount = getEvolutionCount($scope.evolution);

				}, function(err){
					console.log('Evolution failed: ' + err);
				});
	}]);
