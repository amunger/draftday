'use strict'

module.exports = function() {
  var users = {};
  var messages = {};

  this.getMessages = function(league) {
    return messages[league] || [];
  }

  this.addMessage = function(league, message) {
    messages[league] = messages[league] || [];
    messages[league].push(message);
    console.log(JSON.stringify(messages));
  }

  this.getUsers = function(league) {
    return users[league] || [];
  }

  this.addUser = function(league, user) {
    console.log('user ' + user + ' joined league ' + league);
    users[league] = users[league] || [];
    users[league].push(user);
  }

  this.deleteUser = function(league, user) {
    if (users[league]){
      var index = users[league].indexOf(user);
      if (index > -1){
        users[league].splice(index, 1);
      }
    }
  }

}
