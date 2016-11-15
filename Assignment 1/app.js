(function () {
'use strict';

angular.module('LuchController', [])

.controller('LunchCheckController', function ($scope) {
  $scope.name = "";
  $scope.message = "";
  $scope.displayMessage = function () {
    $scope.message = checkDishes($scope.name);
  };


  function checkDishes(string) {
    var message;
    if(string == ""){
      message ="Please Enter Data First!!";
        return message;
        
    }
    else{
        var noOfDishes = string.split(',').length;
    switch(noOfDishes){
      case 1:
      case 2:
      case 3:
        message = "Enjoy Your Lunch";
        return message;
      break;
      default:
        message="Sorry!! Too Much";
        return message;
      
    }

  }
  
}
});


})();