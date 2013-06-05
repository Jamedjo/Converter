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

function SalaryConverter ($scope) {
  $scope.salary=10000;
  $scope.workingHours=35;
  $scope.daysInWorkingWeek=5;
  $scope.salaryPeriods = [
     {name:"Daily", days:function(daysInWorkingWeek){return 1;}}
    ,{name:"Weekly", days:function(daysInWorkingWeek){return daysInWorkingWeek;}}
    ,{name:"4-weeks", days:function(daysInWorkingWeek){return daysInWorkingWeek * 4;}}
    ,{name:"Monthly", days:function(daysInWorkingWeek){return (daysInWorkingWeek * 52)/12; }}
    ,{name:"Annnual", days:function(daysInWorkingWeek){return daysInWorkingWeek * 52; }}
  ];
  $scope.activeSalaryPeriod = "Annnual";
  $scope.setSalaryPeriod = function(period){$scope.activeSalaryPeriod=period;};
  $scope.convertedSalary = function() {
    return $scope.salaryPeriods.filter(function(item){
      return item.name==$scope.activeSalaryPeriod;
    })[0].days($scope.daysInWorkingWeek);
    return $scope.salary;
    // into per day 
  };
}