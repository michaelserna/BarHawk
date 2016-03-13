angular.module('asyncdrink.barAuth', [])

.controller('BarAuthController', function ($scope, $window, $location, BarAuthFactory, optionsFactory) {
    $scope.barUser = {};
    $scope.invalidLogIn = false;
    $scope.barLogin = function () {
      console.log('inside barLogin, $scope.barUser = ', $scope.barUser);
      BarAuthFactory.signin($scope.barUser)
        .then(function (response) {
          optionsFactory.currentUser = response.currentUser;
          $window.localStorage.setItem('com.barhawk', response.token);
          $location.path('/barqueue');
        })
        .catch(function (error) {
          $scope.invalidLogIn = true;
        });
    };
  })
  .factory('BarAuthFactory', function ($location, $http) {
    var signin = function (barUser) {
      return $http({
        method: 'POST',
        url: '/api/barUsers/barSignin',
        data: barUser
      })
      .then(function(resp){
        return resp.data;
      })
    };

    return {
      signin: signin
    };
  });