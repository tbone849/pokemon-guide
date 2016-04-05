angular.module('pokemon')
	.controller('PokemonNameController', ['$scope', 'PokemonNameFactory', function($scope, PokemonNameFactory){

			$scope.loaded = false;
			PokemonNameFactory.getAllNames(function(err, names){
				if(err){
					return console.log(err);
				}

				if(names !== undefined){
					$scope.loaded = true;
					$scope.names = names;
				}
				
			});
	}]);