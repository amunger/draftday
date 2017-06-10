var draftDayApp = angular.module('draftDayApp', ['ngRoute', 'ngCookies', 'angularUtils.directives.dirPagination']);

draftDayApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/login.html',
      controller: 'loginController'
    })
    .when('/draft', {
      templateUrl : 'pages/draftCentral.html',
      controller : 'draftController'
    })
    .when('/chat', {
      templateUrl: 'pages/chat.html',
      controller: 'chatController'
    })
});

draftDayApp.controller('loginController', ['$scope', '$cookies', 'socket', function($scope, $cookies, socket){
  $scope.joinLeague = function (){
    let leagueName = $scope.form.leagueName;
    let userName = $scope.form.userName;
    $cookies.put('leagueName', leagueName);
    $cookies.put('userName', userName);
    socket.emit('joinRoom', {room: leagueName, userName: userName});
    $scope.form = {};
  }
}]);

draftDayApp.controller('mainCtrl', ['$scope', '$cookies', function($scope, $cookies) {
  $scope.leagueName = $cookies.get('leagueName');
  $scope.userName = $cookies.get('userName');
}]);
