var express = require('express');
var mongoose = require('mongoose');
var crypto    = require('crypto');



var dbConfig = require('../db.js');
mongoose.connect(dbConfig.url);

var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function() {
   
});

var userSchema  = new mongoose.Schema({
                        username: String 
                      , password: String
                      },{collection: 'HIQ_USER'});

var User = mongoose.model('HIQ_USER', userSchema);
//console.dir(User);
module.exports = {
  autoLogin : function(user, pass, callback)
  {
    User.findOne({username:user}, function(e, o) {
    if (o){
      o.pass == pass ? callback(o) : callback(null);
    } else{
      callback(null);
    }
  });
  },
  manualLogin : function(user, pass, callback)
  {
    User.findOne({'username': user}, function(e, o) {
    if (o == null){
      callback('user-not-found');
    } else{
      validatePassword(pass, o.password, function(err, res) {
        if (res){
          callback(null, o);
        } else{
          callback('invalid-password');
        }
      });
    }
  });
  }
}

/* private encryption & validation methods */

var generateSalt = function()
{
  var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  var salt = '';
  for (var i = 0; i < 10; i++) {
    var p = Math.floor(Math.random() * set.length);
    salt += set[p];
  }
  return salt;
}

var md5 = function(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
  var salt = generateSalt();
  callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
  /*var salt = hashedPass.substr(0, 10);
  var validHash = salt + md5(plainPass + salt);
  callback(null, hashedPass === validHash);*/
  callback(null, hashedPass === plainPass);
}

