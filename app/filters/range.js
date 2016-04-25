angular.module('pokemon')
	.filter('myLimitTo', function(){
		return function(input, limit, begin) {
    		return input.slice(begin, begin + limit);
  		};
	});