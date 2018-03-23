(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'src/templates/home.template.html'
	})

	.state('categories', {
		url: '/categories',
		templateUrl: 'src/templates/mainpage.template.html',
		controller: 'CategoriesController as categoriesList',
		resolve: {
			categories: ['MenuDataService', function (MenuDataService) {
				return MenuDataService.getAllCategories();
			}]
		}
	})

	.state('items', {
		url: '/items/{categoryShortName}',
		templateUrl: 'src/templates/mainlistpage.template.html',
		controller: 'ItemsController as itemsList',
		resolve: {
			items: ['$stateParams', 'MenuDataService',
						function ($stateParams, MenuDataService) {
							return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
						}]
		}
	});
}

})();