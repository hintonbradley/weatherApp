// ANGULAR MODULE
// Step 1: Creating an Angular app with a module
var weatherApp=angular.module('weatherApp',
// Giving Angular a list of dependencies (by module name) of two services that are going to be used in the app:
	['ngRoute','ngResource']);

// ROUTES
// Adding route provider to allow to specify routes:
weatherApp.config(function
	// injecting route provider to the function:
	($routeProvider){

		// configuring routes:
	$routeProvider
	// when user requests home page:
	.when ('/', {
		// direct to the home page template in the pages directory:
		templateUrl: 'pages/home.htm',
		// and use the homeController:
		controller: 'homeController'
	})
	.when ('/forecast', {
		templateUrl: 'pages/forecast.htm',
		controller: 'forecastController'
	})
	// Step 13: Adding new route to accept number of days forcast parameter
	.when ('/forecast/:days', {
		templateUrl: 'pages/forecast.htm',
		controller: 'forecastController'
	})

});


// SERVICES:
// Step 5: Building services:
weatherApp.service('cityService', function() {
	this.city = "San Francisco, CA";

});


// CONTROLLERS:
// Step 3: Build controllers:
weatherApp.controller('homeController', 
// minification friendly code - passing in an array listing the parameters first:
// Step 6: Injecting cityService service into controllers (array and function) and adding to scope
['$scope','cityService', function($scope, cityService){

	// Adding city to scope
	$scope.city = cityService.city;

	// Step 7: Creating a watcher to update city
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});
}]);

// forecast controller:
// Step 10: Injecting resource service to get weather data from API
// Step 14: Injecting routeParams into the forcast controller to change number of forcast days.
weatherApp.controller('forecastController', ['$scope', '$resource','$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){

	$scope.city = cityService.city;

	// Adding routeParams days to scope to pass into the route.
	$scope.days = $routeParams.days || '2';

	// Step 11: Creating API call with openweathermap.org - sample call: http://api.openweathermap.org/data/2.5/weather?q=London,uk
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily"
		);

	// Creating get request for two days of weather result by city name
	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, APPID: '<your api key here>', cnt: $scope.days });

	// Step 12: Adding function to convert temperature to fahrenheit
	$scope.convertToFahrenheit = function(degK) {

		return Math.round((1.8 * (degK - 273 )) + 32);
	}

	$scope.convertToDate = function(dt) {

		return new Date(dt * 1000);
	}
	
}]);
