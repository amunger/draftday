draftDayApp.controller('draftController', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
  $scope.selectedID = -1;
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

  $scope.customPlayerFormData = {};

  $('#selectCustomModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('[name=playerName]').val('');
    modal.find('[name=position]').val('');
    $scope.customPlayerFormData = {};
  });

  $scope.selectCustomPlayer = function() {
    $http.post('/api/selectPlayerCustom/' + $scope.leagueName, $scope.customPlayerFormData)
      .success(function(data) {
        $scope.customPlayerFormData = {};
        $('#selectCustomModal').modal('hide');
        setTeams(data);
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

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

  $('#insertTeamModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    modal.find('[name=teamName]').val('');
    modal.find('[name=owner]').val('');
    $scope.teamFormData = {};
  });

  $('#updateTeamModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var teamID = button.data('teamid');
    var modal = $(this);

    $scope.teamFormData = {
      teamID : teamID,
      teamName : button.data('teamname'),
      teamOwner : button.data('owner'),
      position : button.data('position')
    };

    modal.find('[name=teamID]').val(teamID);
    modal.find('[name=teamName]').val(button.data('teamname'));
    modal.find('[name=owner]').val(button.data('owner'));
    modal.find('[name=position]').val(button.data('position') + 1);
  });

  $scope.teamFormData = {};

  $scope.upsertTeam = function() {
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

  var setTeams = function (league){
    $scope.currentPick = league.teams[league.currentPick];
    $scope.teams = league.teams;
    if (league.currentPick < $scope.teams.length){
        $scope.teams[league.currentPick].activePick = true;
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
    }
  }

  var shortenName = function (original, length){
    if (original.length < length){
      return original;
    } else {
      return original.slice(0, length-1) + '...';
    }
  }

}]);
