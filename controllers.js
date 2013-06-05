var Converter = angular.module('Converter', ['ui.bootstrap']);

Converter.controller('navActive', ['$scope', '$location', function ($scope, $location) {
    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };        
}]);


function UnitListController($scope) {
  $scope.units = units;
}
function CollapseDemoCtrl($scope) {
  $scope.isCollapsed = true;
}
