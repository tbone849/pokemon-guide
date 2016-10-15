angular.module('pokemon')
	.directive('sprite', ['$http', '$location', function($http, $location){
		return {
			restrict: 'E',
			scope: {
				name: '=',
				loaded: '&',
				hide: '&'
			},
			template: '<img class="sprite" ng-src="{{url}}" width="96" height="96"><span class="sprite-label">{{name | titlecase}}</span>',
			link: function(scope, elem, attr){
				// bug fix: use default variety name to get sprite and for linking
				var checkName = function (name){
					switch(name){
						case 'pumpkaboo':
							name = 'pumpkaboo-average';
							return name;
						case 'gourgeist':
							name = 'gourgeist-average';
							return name;
						case 'wormadam':
							name = 'wormadam-plant';
							return name;
						case 'aegislash':
							name = 'aegislash-shield';
							return name;
						case 'darmanitan':
							name = 'darmanitan-standard';
							return name;
						case 'meowstic':
							name = 'meowstic-male';
							return name;
						default: 
							return name;
					}
				};

				var getSprite = function(name, callback){
					
					$http.get('//pokeapi.co/api/v2/pokemon/' + checkName(name) + '/', {cache:true})
					.then(function(res){
						var url = 'assets/img/pokemon-sprites/sprites/pokemon/' + res.data.id + '.png';
						callback(null, url);
					}, function(err){
						callback(err);
					});
				};

				getSprite(scope.name, function(err, res){
					if(err){
						console.log(err);
						elem.find('img').attr('src', './assets/img/pokeball.png');
						scope.hide();
					}

					if(res !== undefined){
						scope.url = res;
					}
				});

				elem.find('img').on('load', function(){
					scope.loaded();
				});

				elem.bind('click', function(){
					var url = '/pokemon/' + checkName(scope.name);
					scope.$apply(function(){
						$location.url(url);
					});
				});
			}
		};
	}]);