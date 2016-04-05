angular.module('pokemon')
	.controller('PokemonNameController', ['$scope', 'PokemonNameFactory', function($scope, PokemonNameFactory){
			PokemonNameFactory.getAllNames(function(err, names){
				if(err){
					return console.log(err);
				}

				if(names){
					$scope.names = names;
				}
				
			});
	}]);