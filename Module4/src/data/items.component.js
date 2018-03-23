(function () {
'use strict';

angular.module('data')
.component('menuItems', {
	templateUrl: 'src/templates/itemslist.template.html',
	bindings: {
		items: '<'
	}
});

})();
