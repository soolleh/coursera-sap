(function () {
'use strict';

angular.module('data')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['$stateParams','item'];
function ItemDetailController($stateParams,item) {
  var itemDetails = this;
  itemDetails.items = item.data.menu_items;
  itemDetails.category = $stateParams.category;
}
})();