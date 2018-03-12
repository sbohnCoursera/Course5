(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	// ** Controller As syntax
	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
	  var tobuy = this;

	  tobuy.items = ShoppingListCheckOffService.getItems();

	  tobuy.moveItem = function (itemIndex) {
	    ShoppingListCheckOffService.moveItem(itemIndex);
	  };
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
	  var bought = this;

	  bought.items = ShoppingListCheckOffService.getBItems();
	}

	function ShoppingListCheckOffService() {
		var service = this;

		// Hard-coded list of shopping items
		var items = [
							{name: 'Cookies', quantity: '5'},
							{name: 'Chips', quantity: '1 bag'},
							{name: 'Soda', quantity: '12 cans'},
							{name: 'Twizzlers', quantity: '5 packs'},
							{name: 'Peanut M&Ms', quantity: '10 bags'}
						];

		// List of bought items
		var bItems = [];

		service.moveItem = function (itemIndex) {
			//alert(items[itemIndex].name);
			var bItem = {
				name: items[itemIndex].name,
				quantity: items[itemIndex].quantity
			};
			bItems.push(bItem);

			items.splice(itemIndex, 1);
			//alert(removedItem.name);
		}

		service.getItems = function () {
			return items;
		};

		service.getBItems = function () {
			return bItems;
		};

	}
})();

