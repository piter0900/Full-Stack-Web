var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/AircraftList').success(function(response) {
    console.log("I got the data I requested");
    $scope.AircraftList = response;
    $scope.aircraft = "";
  });
};

refresh();

var refresh2 = function() {
  $http.get('/FlightList').success(function(response) {
    console.log("I got the data I requested");
    $scope.FlightList = response;
    $scope.flight = "";
  });
};
refresh2();

$scope.addAircraft = function() {
  console.log($scope.aircraft);
  $http.post('/AircraftList', $scope.aircraft).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.addFlight = function() {
  console.log($scope.flight);
  $http.post('/FlightList', $scope.flight).success(function(response) {
    console.log(response);
    refresh2();
  });
};

$scope.removeA = function(id) {
  console.log(id);
  $http.delete('/AircraftList/' + id).success(function(response) {
    refresh();
  });
};

$scope.removeF = function(id) {
  console.log(id);
  $http.delete('/FlightList/' + id).success(function(response) {
    refresh2();
  });
};

$scope.editA = function(id) {
  console.log(id);
  $http.get('/AircraftList/' + id).success(function(response) {
    $scope.aircraft = response;
  });
}; 

$scope.editF = function(id) {
  console.log(id);
  $http.get('/FlightList/' + id).success(function(response) {
    $scope.flight = response;
  });
}; 

$scope.updateA = function() {
  console.log($scope.aircraft._id);
  $http.put('/AircraftList/' + $scope.aircraft._id, $scope.aircraft).success(function(response) {
   refresh();
  })
};

$scope.updateF = function() {
  console.log($scope.aircraft._id);
  $http.put('/FlightList/' + $scope.flight._id, $scope.flight).success(function(response) {
   refresh2();
  })
};

/*$scope.findAircraft = function(){
	console.log($scope.aircraft);
	$http.get('/AircraftList' + $scope.aircraft).success(function(response) {
    $scope.AircraftList = response;
    $scope.aircraft = "";
  })
};*/

$scope.deselect = function() {
  $scope.aircraft = "";
}

}]);