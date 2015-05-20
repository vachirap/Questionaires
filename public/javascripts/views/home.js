$(document).ready(function(){
	var hv = new HomeValidator();	
	$('#home-form').ajaxForm({				
		success	: function(responseText, status, xhr, $form){			
			if (status == 'success') window.location.href = '/question'+'?question_id='+responseText.question_id;
		},
		error : function(e){
				 console.log(e);
		  		 hv.showError('ข้อมูลผิดพลาด', 'กรุณาตรวจสอบข้อมูลคำถาม-คำตอบ');
				}
		}); 
});
