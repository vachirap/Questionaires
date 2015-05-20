
function HomeValidator(){

// bind a simple alert window to this controller to display any errors //

	this.showErrors = $('#modal-alert');
	this.showErrors.modal({ show : false, keyboard : true, backdrop : true });

	this.showError = function(t, m)
	{
		$('#modal-alert .modal-header h3').text(t);
		$('#modal-alert .modal-body p').text(m);
		console.log($('#modal-alert .modal-header h3').text());
		console.log($('#modal-alert .modal-body p').text());
		this.showErrors.modal({
				    show: true				    
				});
	}

}
