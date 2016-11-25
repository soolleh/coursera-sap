(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
// .constant('ApiBasePath', "menu_items.json")
.directive('foundItems', foundItemsDirective);

function foundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true
  };
  return ddo;
}
NarrowItDownController.$inject = ['MenuSearchService','$filter'];
function NarrowItDownController(MenuSearchService,$filter) {
  var menu = this;
  menu.getMenuItems = function(searchTerm) {
// check if search term is given if not don't call http request
    if ( searchTerm == undefined || searchTerm == "" ) {
       menu.items= "";/* Remove previous found items and then show error message*/
       menu.errorMessage  = "Nothing Found In The Menu Description";
    }
//if search term is given call http request
    else{
    menu.setLoader = "Set loader";menu.errorMessage = "";menu.items = "";/* my liite attempt to show loader by setting loader div to trueby */
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    promise.then(function (foundItems) {
      menu.setLoader = "";/*set loader to false after fetching contens*/
      menu.items= foundItems;      
    }).catch(function (error) {
      menu.items= "";
      menu.setLoader = "";
      menu.errorMessage = error.message || "Server Error : " + error.statusText;
    });
    }

  };
  menu.removeItem = function (itemIndex) {
      menu.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
      menu.items.splice(itemIndex, 1);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath','$filter'];
function MenuSearchService($http, ApiBasePath,$filter) {
  var service = this;
  var foundItems = [];
  service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath)
    }).then(function (response) {
        var menu_items = [];
        angular.forEach(response.data, function(value, key) {
        for(var obj in value)
        { var menu_description = value[obj].description
          if (menu_description == "" || menu_description == undefined) {
            menu_description = "Not Given"
          }
          var item = {
            name: value[obj].name,
            short_name: value[obj].short_name,
            description:menu_description
          };
          menu_items.push(item);
        }
      }); 
      var searchValue = {
        description:searchTerm
      };
      foundItems = ($filter('filter')(menu_items,searchValue));
      //check if search term resulted in zero items return error
      if (foundItems.length == 0) {
         throw new Error("Nothing Found In The Menu Description");
      }  
      else{
        return foundItems;
      }    
    });
  };
}

})();
