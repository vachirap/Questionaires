$(document).ready(function(){
			var lv = new LoginValidator();
			$('#login-form').ajaxForm({
				beforeSubmit : function(formData, jqForm, options){
					if (lv.validateForm() == false){
						return false;
					} 
				},
				success	: function(responseText, status, xhr, $form){					
					if (status == 'success') window.location.href = '/home';
				},
				error : function(e){
		            lv.showLoginError('Login ผิดพลาด', 'กรุณาตรวจสอบ Username/Password ของท่าน');
				}
			}); 
			$('#usr').focus();
});