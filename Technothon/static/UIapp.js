//document.writeln("<script type='text/javascript' src='angular.js'></script>");

angular.module('myAppModule', [ 'ngRoute' ]).config(function($routeProvider) {
                $routeProvider.when('/', {
                                // route for the default (home) page
                                templateUrl : './AQImainpage.html',
                                // controller : 'HomeController'
                }).when('/home', {
                                // route for the default (home) page
                                templateUrl : './AQImainpage.html',
                                // controller : 'HomeController'
                }).when('/aqi', {
                                // route for the default (home) page
                                templateUrl : './AQImainpage.html',
                                // controller : 'HomeController'
                }).when('/parameters', {
                                // route for the default (home) page
                                templateUrl : './parameters.html',
                                // controller : 'HomeController'
                }).when('/daily', {
                                // route for the default (home) page
                                templateUrl : './daily.html',
                                // controller : 'HomeController'
                }).when('/weekly', {
                                // route for the default (home) page
                                templateUrl : './weekly.html',
                                // controller : 'HomeController'
                }).when('/monthly', {
                                // route for the default (home) page
                                templateUrl : './monthly.html',
                                // controller : 'HomeController'
                }).when('/routes', {
                                // route for the default (home) page
                                templateUrl : './checkMultipleRoute.html',
                                // controller : 'HomeController'
                }).when('/help', {
                                // route for the default (home) page
                                templateUrl : './help.html',
                                // controller : 'HomeController'
                }).when('/table', {
                                // route for the default (home) page
                                templateUrl : './table.html',
                                // controller : 'HomeController'
                }).when('/gift', {
                                // route for the default (home) page
                                templateUrl : './giftcoupon.html',
                                // controller : 'HomeController'
                })

                .otherwise({
                                // templateUrl: './routeNotFound.html',
                                // controller: 'NotFoundController'
                })
}).controller(
                                'HomeController',
                                function($scope) {
                                                // $scope.message = 'Welcome to my Home Page!';
                                                $scope.parameters = [ "CO2", "CO", "NO2", "SO2", "PM2.5",
                                                                      "Temperature", "Humidity" ]
                                                // $scope.selection =
                                                // ["CO2","CO","NO2","SO2","PM2.5","Temperature","Humidity","Precipitation"];
                                                $scope.locations=[{"location":["ShankarNagar","1.1"]},{"location":["Burdi","2.1"]},{"location":["Itwari","2.2"]},{"location":["Parsodi","1.2"]}
                                                ,{"location":["Sadar","3.1"]}]
                                                //$scope.location_val

                                                $scope.changeLoc=function(value){
                                                                //console.log($scope.location);
                                                                //console.log(value);
                                                                $scope.location=value;                                 
                                                                //console.log($scope.location);
                                                                //$scope.location=value;
                                                }
                                                $scope.aqi;
                                                $scope.showParameters = false;
                                                $scope.location = "1.1"
                                                                $scope.locDict = {"1.1":"ShankarNagar", "1.2":"Parsodi", "2.1":"Burdi", "2.2":"Itwari", "3.1":"Sadar"};
                                                $scope.Temperature_div = true
                                                $scope.CO2_div = true
                                                $scope.CO_div = true
                                                $scope.NO2_div = true
                                                $scope.SO2_div = true
                                                $scope.Humidity_div = true
                                                $scope.PM_div = true
                                                //$scope.Precipitation_div = true

                                                $scope.toggleSelection = function toggleSelection(parameter_val) {
                                                                /*
                                                                * var idx = $scope.selection.indexOf(parameter_val);
                                                                * 
                                                                 * if (idx > -1) { $scope.selection.splice(idx, 1); } else {
                                                                * $scope.selection.push(parameter_val); }
                                                                */
                                                                // alert(parameter_val)
                                                                switch (parameter_val) {
                                                                case "Temperature":
                                                                                $scope.Temperature_div = !$scope.Temperature_div;
                                                                                break;
                                                                /*case "Precipitation":
                                                                                $scope.Precipitation_div = !$scope.Precipitation_div;
                                                                                break;*/
                                                                case "Humidity":
                                                                                $scope.Humidity_div = !$scope.Humidity_div;
                                                                                break;
                                                                case "PM2.5":
                                                                                $scope.PM_div = !$scope.PM_div;
                                                                                break;
                                                                case "CO2":
                                                                                $scope.CO2_div = !$scope.CO2_div;
                                                                                break;
                                                                case "SO2":
                                                                                $scope.SO2_div = !$scope.SO2_div;
                                                                                break;
                                                                case "NO2":
                                                                                $scope.NO2_div = !$scope.NO2_div;
                                                                                break;
                                                                case "CO":
                                                                                $scope.CO_div = !$scope.CO_div;
                                                                                break;

                                                                }

                                                };
                                })
