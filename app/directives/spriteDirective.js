angular.module('pokemon')
	.directive('sprite', ['$http', function($http){
		return {
			restrict: 'E',
			scope: {
				name: '='
			},
			template: '<img ng-src="{{url}}"><span class="sprite-label">{{name | titlecase}}</span>',
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

				// elem.find('img').bind('load', function(){
				// 	scope.spriteLoaded = true;
				// 	console.log("picture loaded");
				// });


			// MAKE FACTORIES RETURN PROMISES. THEN DO PROMISE CHAINING TO HANDLE CALLS THAT RELY ON FACTORY RESULTS.
			}
		};
	}]);