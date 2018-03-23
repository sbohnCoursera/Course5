(function () {
'use strict';

angular.module('data')
.component('categories', {
	templateUrl: 'src/templates/categorylist.template.html',
	bindings: {
		categories: '<'
	}
});

})();
