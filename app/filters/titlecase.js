angular.module('pokemon')
	.filter('titlecase', ['lodash', function(lodash){
		return function(lowerString){
			var specialCaseCaps = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'dna', 'hp'];
			var splitString = lowerString.split('-');
			var capSubstrings = splitString.map(function(substring){
				if(specialCaseCaps.indexOf(substring) > -1){
					return substring.toUpperCase();
				} else {
					return lodash.capitalize(substring);
				}
				
			});
			var titleCasedString = capSubstrings.join(' ');
			return titleCasedString;
		};
	}]);