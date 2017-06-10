draftDayApp.controller('chatController', ['$scope', '$cookies', '$http', 'socket',

  function($scope, $cookies, $http, socket){

    socket.emit('joinRoom', {room:$scope.leagueName, userName: $scope.userName});

    $http.get('/api/users/' + $scope.leagueName)
      .success(function(data) {
        $scope.users = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    $http.get('/api/messages/' + $scope.leagueName)
        .success(function(data) {
          $scope.messages = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });

    socket.on('send:message', function (message) {
      console.log('message received ' + JSON.stringify(message));
      $scope.messages.push(message);
    });

    socket.on('change:name', function (data) {
      changeName(data.oldName, data.newName);
    });

    socket.on('user:join', function (data) {
      console.log('User ' + data.name + ' has joined.');
      $http.get('/api/users/' + $scope.leagueName)
        .success(function(data) {
          $scope.users = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    });

    // add a message to the conversation when a user disconnects or leaves the room
    socket.on('user:left', function (data) {
      console.log('User ' + data.name + ' has left.');
      $http.get('/api/users/' + $scope.leagueName)
        .success(function(data) {
          $scope.users = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    });

    // Private helpers
    // ===============

    var changeName = function (oldName, newName) {
      // rename user in list of users
      var i;
      for (i = 0; i < $scope.users.length; i++) {
        if ($scope.users[i] === oldName) {
          $scope.users[i] = newName;
        }
      }

      $scope.messages.push({
        user: 'chatroom',
        text: 'User ' + oldName + ' is now known as ' + newName + '.'
      });
    }

    // Methods published to the scope
    // ==============================

    $scope.changeName = function () {
      socket.emit('change:name', {
        name: $scope.newName
      }, function (result) {
        if (!result) {
          alert('There was an error changing your name');
        } else {

          changeName($scope.userName, $scope.newName);

          $scope.userName = $scope.newName;
          $scope.newName = '';
          $cookies.put('userName', $scope.userName);
        }
      });
    };

    $scope.messages = [];

    $scope.sendMessage = function () {
      socket.emit('send:message', {
        message: $scope.message
      });

      // add the message to our model locally
      $scope.messages.push({
        user: $scope.userName,
        text: $scope.message
      });

      // clear message box
      $scope.message = '';

    }

}]);
