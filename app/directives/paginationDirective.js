angular.module('pokemon')
	.directive('paginate', ['$location', function($location){
		return {
			restrict: 'E',
			scope: {
				pages: '=',
				currentPage: '='
			},
			templateUrl: 'views/paginate.html',
			link: function(scope, elem, attr){
				scope.$watch('pages', function(newValue){
					if(newValue){
						if(scope.currentPage < 4 || scope.pages.length < 6){
							scope.start = 0;
						} else if(scope.pages.length - scope.currentPage < 3){
							scope.start = scope.pages.length - 5;
						} else {
							scope.start = scope.currentPage - 3;
						}
					}
					
				});
			}
		};

	}]);