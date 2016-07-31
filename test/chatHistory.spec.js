'use strict'
var assert = require('assert');
var chat = require('../app/data').chat;

describe('the chat history', function (){
  chat.addMessage('league1', 'hello');
  chat.addMessage('league1', 'hi');
  chat.addMessage('league2', 'goodbye');

  describe('getting the chat history for a new league', function (){
    var messages = chat.getMessages('newLeague');

    it('should have an empty list of messages', function() {
      assert(messages.length === 0, 'the messages should be empty');
    });

  });
  describe('getting messages from a league with messages', function(){
    var messages = chat.getMessages('league1');
    assert.equal(messages.length, 2);
    assert.equal(messages[0], 'hello');
    assert.equal(messages[1], 'hi');
  });

});

describe('the users', function (){

  describe('within a new league', function (){
    var users = chat.getUsers('newLeague');
    it('should have an empty list', function(){
      assert(users.length === 0);
    });
  });

  describe('with users in multiple leagues', function(){
    chat.addUser('league1', 'Jerry');
    chat.addUser('league2', 'Tom');
    chat.addUser('league2', 'Sal');

    it('should have the correct number of users for each league', function() {
      assert.equal(1, chat.getUsers('league1').length);
      assert.equal(2, chat.getUsers('league2').length);
    });
  });

  describe('removing users', function(){

  })

});
