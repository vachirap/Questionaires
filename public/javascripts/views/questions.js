$(document).ready(function(){
	var qv = new QuestionValidator();	
	$('#question-form').ajaxForm({	
		beforeSubmit : function(formData, jqForm, options){		
					if (qv.validateForm() == false){
						return false;
					} 
				},			
		success	: function(responseText, status, xhr, $form){			
			if (status == 'success') 
			{
				if(responseText.question_id){
					window.location.href = '/question'+'?question_id='+responseText.question_id;
				}else{
					window.location.href = '/result';
				}
			}
		},
		error : function(e){
				 console.log(e);
		  		 qv.showQuestionError('ข้อมูลผิดพลาด', 'กรุณาตรวจสอบข้อมูลคำถาม-คำตอบ');
				}
		}); 
	$('input:radio[name=ans]').click(function() {
		$('input[name=sel_ansId]').val($(this).attr('id'));		
	});

});
