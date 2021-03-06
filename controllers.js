var Converter = angular.module('Converter', ['ui.bootstrap']);

function NavBar($scope, $location) {
  $scope.isCollapsed = true;
    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'All';
        return page === currentRoute ? 'active' : '';
    };        
};

function WordCountController($scope){
  $scope.text = "";
  $scope.countWords = function(){
    return $scope.text.trim().replace(/\s+/gi, ' ').split(' ').length
  };
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

function defaultCurrencyFromLanguage(){
  var lang = window.navigator.userLanguage || window.navigator.language;
  var symbol = "$";
  if(/gb|uk|tr|je|ta|gs|gg|im|sd|sl|vg|cy|eg|fk|gi|lb|sh|ac|ss|sd|sy/i.test(lang)) {
    symbol = "£";
  }
  else if(/me|sk|ea|gf|tf|bl|mf|ie|ee|re|it|mc|si|de|es|at|yt|gp|pm|cy|pt|fr|gr|ic|be|ad|fi|lu|va|mt|sm|mq|nl|ax|cs/i.test(lang)) {
    symbol = "€";
  }
  else if(/cn|jp|fm|sj/i.test(lang)) {
    symbol = "¥";
  }
  else if(/in|bt|pk|bd|iq|np|mu|sc|lk/i.test(lang)) {
    symbol = "₨";
  }
  else if(/kp|kr/i.test(lang)) {
    symbol = "₩";
  }
  else if(/li|ch/i.test(lang)) {
    symbol = "CHF";
  }
  else if(/is|nb|nn|sv|et|da/i.test(lang)) {
    symbol = "kr";
  }
  else if(/ru/i.test(lang)) {
    symbol = "руб";
  }
  return symbol;
}

function SalaryConverter ($scope) {
  $scope.defaultCurrency = defaultCurrencyFromLanguage();
  $scope.salary=12480;
  $scope.workingHoursDay=8;
  // $scope.workingHoursWeek=35;
  $scope.daysInWorkingWeek=5;
  $scope.timePeriods = [
     {name:"hourly",        noun:"wages", days:function(){return 1}}
    ,{name:"daily",         noun:"wages", days:function(daysInWorkingWeek){return 1;}}
    ,{name:"weekly",        noun:"a salary", days:function(daysInWorkingWeek){return daysInWorkingWeek;}}
    ,{name:"every 4 weeks", noun:"a salary", days:function(daysInWorkingWeek){return daysInWorkingWeek * 4;}}
    ,{name:"monthly",       noun:"a salary", days:function(daysInWorkingWeek){return (daysInWorkingWeek * 52)/12; }}
    ,{name:"annually",      noun:"a salary", days:function(daysInWorkingWeek){return daysInWorkingWeek * 52; }}
  ];
  $scope.activeSalaryPeriod = "annually";
  $scope.activeOutputPeriod = "hourly";
  $scope.activeSalaryNoun = function() {
    return $scope.timePeriods.filter(function(item){
      return item.name==$scope.activeSalaryPeriod;
    })[0].noun
  };
  $scope.setSalaryPeriod = function(period){
    $scope.activeSalaryPeriod=period;
  };
  $scope.setOutputPeriod = function(period){
    $scope.activeOutputPeriod=period;
  };
  $scope.daysInPeriod = function(activePeriod){
    return $scope.timePeriods.filter(function(item){
      return item.name==activePeriod;
    })[0].days($scope.daysInWorkingWeek);
  }
  $scope.hoursVisible = function() {
     return ($scope.activeSalaryPeriod=="hourly") || ($scope.activeOutputPeriod=="hourly")
  }
  $scope.daysVisible = function() {//daily-daily false, week-week false, day-week true, week-day,true
    if(($scope.activeOutputPeriod=="hourly") || ($scope.activeOutputPeriod=="daily")){
      if(($scope.activeSalaryPeriod=="hourly") || ($scope.activeSalaryPeriod=="daily")){
        return false;
      } else {
        return true;
      }
    } else {
      if(($scope.activeSalaryPeriod=="hourly") || ($scope.activeSalaryPeriod=="daily")){
        return true;
      } else {
        return false;
      }
    }
  }
  $scope.averageVisible = function() {
    return $scope.daysVisible() || $scope.hoursVisible();
  }
  $scope.convertedSalary = function() {
    var salaryPerDay = $scope.salary/$scope.daysInPeriod($scope.activeSalaryPeriod);
    if($scope.activeSalaryPeriod=="hourly"){salaryPerDay=salaryPerDay*$scope.workingHoursDay}
    // var hoursInDay = $scope.workingHoursWeek / $scope.daysInWorkingWeek;
    if($scope.activeOutputPeriod=="hourly"){
      return salaryPerDay/$scope.workingHoursDay;
    } else {
      return salaryPerDay * $scope.daysInPeriod($scope.activeOutputPeriod);
    }
  };
}
