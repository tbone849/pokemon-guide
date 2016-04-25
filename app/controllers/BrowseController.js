angular.module('pokemon')
	.controller('BrowseController', ['$scope', '$http', '$routeParams', 'BrowseFactory', function($scope, $http, $routeParams, BrowseFactory){

		var page = $routeParams.page;
		var offset = '';
		if(page === '1'){
			console.log('page is 1');
			offset = 0;
		} else {
			offset = (page - 1) * 30;
		}


		var parsePokemon = function(results){
			var pokemon = results.map(function(result){
				return {
					name: result.data.name,
					sprite: result.data.sprites.front_default
				};
			});

			return pokemon;
		};
		var getPokemonByPage = function(offset){
			$http.get('http://pokeapi.co/api/v2/pokemon/?limit=30' + '&offset=' + offset)
				.then(function(res){
					BrowseFactory.getPokemon(res.data.results)
						.then(function(res){
							$scope.pokemon = parsePokemon(res);
							console.log('success');
						}, function(err){
							console.log('Individual retrieval failed.');
						});
				}, function(err){
					console.log('Group retrieval failed.');
				});
		};

		getPokemonByPage(offset);

	}]);