    var resumeApp = angular.module('resumeApp', ['ngRoute']);


    resumeApp.config(function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'views/resume_json.html',
            controller: 'ResumeCtrl'
          }).
          when('/:resume', {
            templateUrl: 'views/resume.html',
            controller: 'ResumeParseCtrl'
          }).
          otherwise({
            redirectTo: '/'
          });
    });


    resumeApp.controller('ResumeCtrl', function ($scope, $http, $location, $rootScope){
        new Clipboard('.btn');

        $http.get('_sample.json').success(function(data) {
          $scope.sample_json = data;
        });

        $scope.parseJson = function() {
          if ($scope.enteredJson == undefined) {
            $scope.message = "Please paste/write JSON to generate your resume.";
          } 
          else {
            try {
                $scope.message = "Please wait..";
                $rootScope.result = angular.fromJson($scope.enteredJson);
                $location.path('resume');
            } catch (e) {
                $scope.message = "Please add a valid JSON to generate your resume.";
                $location.path('/');
            }  
          }
        };
    });


    resumeApp.controller('ResumeParseCtrl', function ($scope, $routeParams, $location, $rootScope){
      if ($rootScope.result == undefined) $location.path('/');
      
      $scope.name = $routeParams.resume;
      $scope.data = $rootScope.result;
      console.log($rootScope.result.basic_information.first_name);
    });

