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

draftDayApp.controller('loginController', ['$scope', '$cookies', function($scope, $cookies){
  $scope.joinLeague = function (){
    $cookies.put('leagueName', $scope.form.leagueName);
    $scope.form = {};
  }
}]);

draftDayApp.controller('draftController', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
  $scope.selectedID = -1;
  $scope.leagueName = $cookies.get('leagueName');
  $scope.processing = false;

  $http.get('/api/players')
    .success(function(data) {
      $scope.players = data;
      arrangePlayers();
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  if ($scope.leagueName){
    $http.get('/api/teams/' + $scope.leagueName)
      .success(function(data) {
          console.log(data);
          setTeams(data);
          arrangePlayers();
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
  }

  $scope.selectPlayer = function (playerID){
    $scope.processing = true;
    $http.get('/api/selectPlayer/' + $scope.leagueName + '/' + playerID)
      .success(function(data) {
        console.log(data);
        setTeams(data);
        $scope.processing = false;
        arrangePlayers();
      })
      .error(function(data) {
        console.log('Error: ' + data);
        $scope.processing = false;
      });
  }

  $scope.undoLastPick = function (){
    $http.get('/api/undoLastPick/' + $scope.leagueName)
      .success(function(data) {
        console.log(data);
        setTeams(data);
        arrangePlayers();
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }

  $scope.teamFormData = {};

  $scope.createTeam = function() {
    $http.post('/api/team/' + $scope.leagueName, $scope.teamFormData)
      .success(function(data) {
        $scope.teamFormData = {};
        setTeams(data);
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.deleteTeam = function(id) {
    $http.delete('/api/team/' + id)
      .success(function(data) {
        setTeams(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.countAtPosition = function(team, position){
    if (team){
      var posList = team.players.filter(function(p) {return p.position == position});
      return posList.length;
    }
    else{
      return 0;
    }
  }

  var setTeams = function (teamData){
    $scope.currentPick = teamData.teams.splice(teamData.currentPick, 1)[0];
    $scope.teams = teamData.teams;
    if (teamData.currentPick < $scope.teams.length){
        $scope.teams[teamData.currentPick].nextUp = true;
    }
  };

  var arrangePlayers = function (){
    var leagueTeams = $scope.teams || [];
    if ($scope.players && $scope.currentPick){
      $scope.players.map(function (player) {player.selected = ''});
      $scope.currentPick.players.forEach(function (player){
        setPlayerAsSelected(player, $scope.currentPick.name);
      });
      leagueTeams.forEach(function (team){
        team.players.forEach(function (player){
          setPlayerAsSelected(player, team.name);
        });
      });
    }
  };

  var setPlayerAsSelected = function (player, teamName){
    var found = $scope.players.find(function(p) {return p.id === player.id});
    var team = shortenName(teamName, 15);
    if (found){
      found.selected = team;
    } else {
      player.selected = team;
      $players.push(player);
    }
  }

  var shortenName = function (original, length){
    if (original.length < 10){
      return original;
    } else {
      return original.slice(0, length-1) + '...';
    }
  }

}]);
