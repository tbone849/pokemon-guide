angular.module('pokemon')
	.controller('BrowseController', ['$scope', '$http', '$routeParams', 'lodash', function($scope, $http, $routeParams, lodash){

		$scope.currentPage = parseInt($routeParams.page);
		var offset = '';
		if($scope.currentPage === 1){
			offset = 0;
		} else {
			offset = ($scope.currentPage - 1) * 30;
		}

		var formSpriteUrl = function(url){
			var urlChunks = url.split('/');
			var id = urlChunks[6];
			return '//pokeapi.co/media/sprites/pokemon/' + id + '.png';
		};

		var parsePokemon = function(results){
			var pokemon = results.map(function(result){
				return {
					name: result.name,
					sprite: formSpriteUrl(result.url)
				};
			});
			return pokemon;
		};

		var getPokemonByPage = function(offset){
			$http.get('//pokeapi.co/api/v2/pokemon/?limit=30' + '&offset=' + offset)
				.then(function(res){
					$scope.pages = lodash.range(1, Math.ceil(res.data.count/30) + 1);
					$scope.pokemon = parsePokemon(res.data.results);
					$scope.loaded = true;
				}, function(err){
					$scope.error = true;
					$scope.loaded = true;
					console.log('Group retrieval failed.');
				});
		};

		getPokemonByPage(offset);

	}]);