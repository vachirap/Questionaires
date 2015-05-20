var User = require('../models/userModel');
var Question = require('../models/questionModel');
var UserQuestionPoint =  require('../models/userQuestionPointModel');

module.exports = function(app){		
	app.use('/', function (req, res, next) {
	  console.log('Request Type:', req.method);
	  next();
	});
	app.use('/signup',function (req, res, next) {	 
	  next();
	});
	app.use('/home',function (req, res, next) {	 
	  next();
	});
	app.use('/question',function (req, res, next) {	 
	  next();
	});

	


	app.get('/', function(req, res){
	// check if the user's credentials are saved in a cookie //
		if (req.cookies.username == undefined || req.cookies.password == undefined){
			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}	else{
	// attempt automatic login //
			User.autoLogin(req.cookies.username, req.cookies.password, function(o){
				if (o != null){
				    req.session.username = o;
				   
					res.redirect('/home');
				}	else{
					res.render('login', { title: 'Hello - Please Login To Your Account' });
				}
			});
		}
	});
	
	app.post('/', function(req, res){		
		User.manualLogin(req.body.user, req.body.pass, function(e, o){
			if (!o){
				res.status(400).send(e);
			}	else{				 				
			    req.session.username = o;
				/*if (req.param('remember-me') == 'true'){
					res.cookie('username', o.username);
					res.cookie('password', o.password);
				}*/				
				res.status(200).send(o);

			}
		});
	});

	app.get('/home', function(req, res){
	    if (req.session.username == null){
			// if user is not logged-in redirect back to login page //
	        	res.redirect('/');
	    }   else{
				res.render('home',{title: 'Welcome - Questionaires' });
	    }	
	});

	app.post('/home', function(req, res){
				console.log("req.method",req.method);			
				res.send({ question_id: 1 });
	});	


	app.get('/question',function(req,res){	
			var question_id = req.query.question_id;		
			Question.getQuestions(question_id,function(e, o){
			 if (req.session.username == null){
			// if user is not logged-in redirect back to login page //
	        	res.redirect('/');
	    	 }else{
	    	 	if (o != null){	 
	    	 		var objAns = {};
	    	 		if (req.session.username.qAns_data != null && req.session.username.qAns_data.length > 0){ 	 
	    	 			 var index = findIndexQuestionById(req.session.username.qAns_data,{quest_id:question_id});		
					 	if(index&&index>=0){
					 		objAns = req.session.username.qAns_data[index];	
					 	}	
	    	 			
	    	 		}
	    	 		console.log("Session qAns_data get",req.session.username.qAns_data);
	    	 		console.log("objAns",objAns);
	    	 		res.render('question',{title: 'Welcome - Questionaires'
	    	 				,question_data: o 
	    	 				,answer_data : objAns
	    	 		});
	    	 	}else{
	    	 		res.redirect('/');
	    	 	}
				
	    	 }
	     });	
	});

	app.post('/question',function(req,res){	
		var question_id = req.body.q_id;
		var points = req.body.ans;
		var ans_id = req.body.sel_ansId;
		console.log("ans_id",ans_id);
		var quest_action = req.body.quest_action;
		var qAns_data = [];

		 var obj = new Object();
		 obj.quest_id = question_id;
		 obj.quest_points = points;
		 obj.ans_id = ans_id;

		 if (req.session.username.qAns_data != null && req.session.username.qAns_data.length > 0){
		 		qAns_data = req.session.username.qAns_data;
		 			
		 }		 
		
		 var index = findIndexQuestionById(qAns_data,obj);		
		 if(index&&index>=0){
		 	qAns_data[index] = obj;
		 	req.session.username.qAns_data = qAns_data;
		 }else{
		 	qAns_data.push(obj);
		 	req.session.username.qAns_data = qAns_data;
		 }
		 console.log("Session qAns_data post",req.session.username.qAns_data);
		 //todo ต้อง modify array หรือยัด obj ใส่ array
		
		if(quest_action=='next'){
			question_id++;
			res.send({ question_id:  question_id});
		}else if(quest_action=="previous"){
			question_id--;
			res.send({ question_id:  question_id});
		}else if(quest_action=="result"){
			console.log("qAns_data",qAns_data);
			var objRW = CountRightWrongQuestions(qAns_data);
			console.log("objRW",objRW);
			UserQuestionPoint.saveResult(req.session.username.username, objRW, function(o){
				if (o != null){				   
				   	res.send({ status :"success"});
					
				}	else{
					res.status(400).send("ข้อมูลผิดพลาด")
				}
			});
		}else{
			res.status(400).send("ข้อมูลผิดพลาด");
		}
	});

	app.get('/result',function(req,res){	
			 console.log("get Result");
			 if (req.session.username == null){
			// if user is not logged-in redirect back to login page //
	        	res.redirect('/');
	    	 }else{
	    	 	var user = req.session.username.username;		
				UserQuestionPoint.getResult(user,function(e, o){
			    	 	if (o != null){	    	 		
			    	 		res.render('result',{title: 'Result - Questionaires'
			    	 			,user_question_point: o 
			    	 		});
			    	 	}
	    	 	 });
				
	    	 }
	    	
	});

	app.post('/result',function(req,res){
	    console.log("sign out")	;
		req.session.destroy(function(e){res.redirect('/'); });	    	
	});
	app.get('/signup',function(req, res) {
		res.render('signup',{title: 'Signup - Plase input detail about you'});	
	});

	app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });
};

function findIndexQuestionById(arrObj,obj)
{    
    for(var i in arrObj){
        var oArr = arrObj[i];        
        if(oArr.quest_id==obj.quest_id)
        {
            return i;
        }
    }
}


function CountRightWrongQuestions(arrObj)
{    
	var nRight = 0;
	var nWrong = 0;
	var points  = 0;
	var objN = new Object();
    for(var i in arrObj){
        var oArr = arrObj[i];        
        if(parseInt(oArr.quest_points)==1)
        {
            nRight++;
        }
        else{
        	nWrong++;
        }
        points = points + parseInt(oArr.quest_points);
    }
    objN.quest_right = nRight;
    objN.quest_wrong = nWrong;
    objN.quest_points = points;
    return objN;
}


