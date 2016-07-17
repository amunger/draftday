var draftDayApp = angular.module('draftDayApp', []);

function teamController($scope, $http) {
  $scope.formData = {};

  // when landing on the page, get all todos and show them
  $http.get('/api/teams')
    .success(function(data) {
      $scope.currentPick = data.shift();
      $scope.teams = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

  // when submitting the add form, send the text to the node API
  $scope.createTeam = function() {
    $http.post('/api/teams', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clear the form so our user is ready to enter another
        $scope.teams = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // delete a todo after checking it
  $scope.deleteTeam = function(id) {
    $http.delete('/api/teams/' + id)
      .success(function(data) {
        $scope.teams = teams;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
  };

}
