angular.module('pokemon')
	.directive('pokemon', ['$location', function($location){
		return {
			restrict: 'E',
			scope: {
				name: '=',
				spriteUrl: '='
			},
			transclude: true, 
			template: '<div class="pokemon-container"><img class="pokemon-image" ng-src="{{spriteUrl}}" width="96" height="96"><div class="pokemon-name">{{name | titlecase}}</div></div>',
			link: function(scope, elem, attr){
				elem.bind('click', function(){
					var url ='/pokemon/' + scope.name;
					scope.$apply(function(){
						$location.url(url);
					});
				});
			}
		};
	}]);