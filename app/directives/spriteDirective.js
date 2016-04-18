angular.module('pokemon')
	.directive('sprite', ['$http', function($http){
		return {
			restrict: 'E',
			scope: {
				name: '='
			},
			template: '<img ng-src="{{url}}">',
			link: function(scope, elem, attr){
				var getSprite = function(name){
					$http.get('//pokeapi.co/api/v2/pokemon/' + name + '/')
					.then(function(res){
						scope.url = 'http://pokeapi.co/media/sprites/pokemon/' + res.data.id + '.png';
					})
					.then(function(err){
						if(err){
							console.log(err);
						}
					});
				};

				getSprite(scope.name);
			}
		};
	}]);