angular.module('pokemon')
	.controller('PokemonDetailController', ['$scope', 'PokemonDetailFactory', '$routeParams', function($scope, PokemonDetailFactory, $routeParams){

			$scope.name = $routeParams.name;
			PokemonDetailFactory.getDetails($scope.name, function(err, res){
				if(err){
					return console.log(err);
				}

				// if(res !== undefined){
				// 	$scope.foundDetails = true;
				// 	$scope.pokemon = res;
				// }
			})
	}]);
