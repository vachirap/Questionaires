var express = require('express');
var mongoose = require('mongoose');

var dbConfig = require('../db.js');
mongoose.connect(dbConfig.url);

var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function() {
   
});

var userQuestionPointSchema  = new mongoose.Schema({
                        username: String 
                      , quest_points: String
                      , quest_right : String
                      , quest_wrong : String
                      },{collection: 'HIQ_USER_QUESTION_POINT'});

var userQuestionPoint = mongoose.model('HIQ_USER_QUESTION_POINT', userQuestionPointSchema);
//console.dir(User);
module.exports = {
  saveResult : function(user, objQuestAns, callback)
  {
	    userQuestionPoint.findOne({username:user}, function(e, o) {
		    if (o){
		    	console.log(o._id)
		     	var id = o._id;
		     	userQuestionPoint.update( {_id: id }
		     		 						, { $set: { quest_points: objQuestAns.quest_points,
		     		 									quest_right : objQuestAns.quest_right,
		     		 									quest_wrong : objQuestAns.quest_wrong
		     		 						   		  }
		     		 						   }
  											, function(error, result) {
													  if (error) {
													  	callback("ไม่สามารถแก้ไขข้อมูลได้");
													  } else{
													  	callback(o);
													  }
											});
		    } else{
		       var objSave =  new userQuestionPoint({username : user,
		       										 quest_points :objQuestAns.quest_points,
		       										 quest_right : objQuestAns.quest_right,
		       										 quest_wrong : objQuestAns.quest_wrong
		       										});
		       objSave.save(function (err) {
					  if (err) {
					  	callback("ไม่สามารถบันทึกข้อมูลได้");
					  } else{
					  	callback(objSave);
					  }
				});
		    }
	  });
  },
  getResult : function(user, callback)
  {
	    userQuestionPoint.findOne({username:user}, function(e, o) {
		   	if (o == null){
			      callback('user-not-found');
			} else{
		          callback(null, o);
		    }	 
	  	});
  }
}