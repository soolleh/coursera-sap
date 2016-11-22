(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var ToBuyList = this;
  ToBuyList.items = ShoppingListCheckOffService.getItems();
  ToBuyList.BuyItem = function (itemIndex) {
    ShoppingListCheckOffService.BuyItem(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.bought = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;
  // List of shopping items
  var toBuyItems = [
    {
        name:"Cookies",
        quantity:"10",
    },
    {
        name:"Chocolates",
        quantity:"5",
    },
    {
        name:"Milk",
        quantity:"5",
    },
    {
        name:"Pepto Bismol",
        quantity:"15",
    },
    {
        name:"Pepsi",
        quantity:"3",
    }
  ];
  var  boughtItems=[];
  service.BuyItem = function (itemIndex) {
	var item = toBuyItems[itemIndex]
	boughtItems.push(item);
	toBuyItems.splice(itemIndex, 1);
  };
  service.getItems = function () {
    return toBuyItems;
  };
  service.getBoughtItems = function () { 
    return boughtItems;   
  };
}

})();
