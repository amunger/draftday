var draftDayApp = angular.module('draftDayApp', ['angularUtils.directives.dirPagination']);

function draftController($scope, $http) {
  $scope.selectedID = -1;

  $http.get('/api/players')
    .success(function(data) {
      console.log(data);
      $scope.players = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $http.get('/api/teams/' + 'mockleague')
    .success(function(data) {
        console.log(data);
        setTeams(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

  $scope.selectPlayer = function (playerID){
    console.log(playerID + ' selected');
    $http.get('/api/selectPlayer/' + 'mockleague' + '/' + playerID)
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
    $http.post('/api/team/' + 'mockleague', $scope.teamFormData)
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
    var posList = team.players.filter(function(p) {return p.position == position});
    return posList.length;
  }

  var setTeams = function (teams){
    $scope.currentPick = teams.shift();
    $scope.teams = teams;
  };

}
