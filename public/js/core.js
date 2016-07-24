var draftDayApp = angular.module('draftDayApp', ['angularUtils.directives.dirPagination']);

function draftController($scope, $http) {
  $scope.selectedID = -1;
  $scope.leagueName = 'mockleague';

  $http.get('/api/players')
    .success(function(data) {
      $scope.players = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $http.get('/api/teams/' + $scope.leagueName)
    .success(function(data) {
        console.log(data);
        setTeams(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

  $scope.selectPlayer = function (playerID){
    $http.get('/api/selectPlayer/' + $scope.leagueName + '/' + playerID)
      .success(function(data) {
        console.log(data);
        setTeams(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }

  $scope.undoLastPick = function (){
    $http.get('/api/undoLastPick/' + $scope.leagueName)
      .success(function(data) {
        console.log(data);
        setTeams(data);
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

  var setTeams = function (teams){
    $scope.currentPick = teams.shift();
    $scope.teams = teams;
  };

}
