angular.module('pokemon')
	.directive('sprite', ['$http', function($http){
		return {
			restrict: 'E',
			scope: {
				name: '=',
				loaded: '&'
			},
			template: '<img class="sprite" ng-src="{{url}}" width="96" height="96"><span class="sprite-label">{{name | titlecase}}</span>',
			link: function(scope, elem, attr){
				var getSprite = function(name, callback){
					$http.get('//pokeapi.co/api/v2/pokemon/' + name + '/')
					.then(function(res){
						var url = 'http://pokeapi.co/media/sprites/pokemon/' + res.data.id + '.png';
						callback(null, url);
					})
					.then(function(err){
						callback(err);
					});
				};

				getSprite(scope.name, function(err, res){
					if(err){
						console.log(err);
					}

					if(res !== undefined){
						scope.url = res;
					}
				});

				elem.find('img').on('load', function(){
					scope.loaded();
				});
			}
		};
	}]);