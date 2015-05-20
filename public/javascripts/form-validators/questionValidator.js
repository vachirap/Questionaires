
function QuestionValidator(){

// bind a simple alert window to this controller to display any errors //

	this.showQuestionErrors = $('#modal-alert');
	this.showQuestionErrors.modal({ show : false, keyboard : true, backdrop : true });

	this.showQuestionError = function(t, m)
	{
		$('#modal-alert .modal-header h3').text(t);
		$('#modal-alert .modal-body p').text(m);
		console.log($('#modal-alert .modal-header h3').text());
		console.log($('#modal-alert .modal-body p').text());
		console.log(this.showQuestionErrors);
		this.showQuestionErrors.modal({
				    show: true				    
				});
	}

}

QuestionValidator.prototype.validateForm = function()
{
	if ((typeof $('input:radio[name=ans]:checked').val() == 'undefined')||($('input:radio[name=ans]:checked').val() == '')){
		this.showQuestionError('ไม่ได้เลือกคำตอบ!!!','กรุณาเลือกคำตอบ');		
		return false;
	}	else{
		return true;
	}
}

