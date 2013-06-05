var Converter = angular.module('Converter', ['ui.bootstrap']);

function NavBar($scope, $location) {
  $scope.isCollapsed = true;
    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'All';
        return page === currentRoute ? 'active' : '';
    };        
};


function UnitListController($scope) {
  $scope.units = units;
}
function updateOnResize($window, $scope) {
  $scope.width = $window.innerWidth;
  $scope.height = $window.innerHeight;
  $scope.lt550 = ($window.innerWidth<550);
}
Converter.run(function ($window, $rootScope) {
  updateOnResize($window, $rootScope);
  angular.element($window).bind('resize', function () {
      $rootScope.$apply(function () {
          updateOnResize($window, $rootScope);
      });
  });
});

Converter.filter('ifTrue', function() {
    return function(input, trueText) {
      if (input) {
        return trueText;
      }
      return "";
    }
  });