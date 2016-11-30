(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider,$locationProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/home');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/home',
    templateUrl: 'src/shoppinglist/templates/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/shoppinglist/templates/categories.template.html',
    controller: 'categoriesListController as categoryList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('itemDetail', {
    url: '/item-detail/{categoryShortName}',
    templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
    controller: "ItemDetailController as itemDetails",
    resolve: {
      item: ['MenuDataService','$stateParams', function (MenuDataService,$stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
      }]
    },
    params : {
      categoryShortName : null,
      category : null
    }
  });
}
})();