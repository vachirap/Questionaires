
function LoginValidator(){

// bind a simple alert window to this controller to display any errors //

	this.loginErrors = $('#modal-alert');
	this.loginErrors.modal({ show : false, keyboard : true, backdrop : true });

	this.showLoginError = function(t, m)
	{
		$('#modal-alert .modal-header h3').text(t);
		$('#modal-alert .modal-body p').text(m);
		console.log($('#modal-alert .modal-header h3').text());
		console.log($('#modal-alert .modal-body p').text());
		console.dir(this.loginErrors);
		this.loginErrors.modal({
				    show: true				    
				});
	}

}

LoginValidator.prototype.validateForm = function()
{
	if ($('#usr').val() == ''){
		this.showLoginError('ไม่กรอก Username!!!','กรุณากรอก Username');
		$('#usr').focus();
		return false;
	}	else if ($('#pwd').val() == ''){
		this.showLoginError('ไม่กรอก รหัสผ่าน!!!','กรุณากรอก Password');
		$('#pwd').focus();
		return false;
	}	else{
		return true;
	}
}