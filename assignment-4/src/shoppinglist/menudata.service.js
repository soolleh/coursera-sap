(function () {
'use strict';

angular.module('data')
.constant('ApiBasePath','https://davids-restaurant.herokuapp.com/categories.json')
.constant('ApiBasePath2','https://davids-restaurant.herokuapp.com/menu_items.json?category=')
.service('MenuDataService', MenuDataService);



MenuDataService.$inject = ['$http', 'ApiBasePath','ApiBasePath2']
function MenuDataService($http, ApiBasePath,ApiBasePath2) {
  var service = this;
  service.getAllCategories = function () {
      var response =  $http({
        method: "GET",
        url: (ApiBasePath)
    });
    return response;
  };

  service.getItemsForCategory = function (categoryShortName) {
      var response =  $http({
        method: "GET",
        url: (ApiBasePath2) + categoryShortName
    });
    return response;
  };
}

})();