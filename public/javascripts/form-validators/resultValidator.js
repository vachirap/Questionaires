function ResultValidator(){

// bind a simple alert window to this controller to display any errors //

	this.showResultErrors = $('#modal-alert');
	this.showResultErrors.modal({ show : false, keyboard : true, backdrop : true });

	this.showResultError = function(t, m)
	{
		$('#modal-alert .modal-header h3').text(t);
		$('#modal-alert .modal-body p').text(m);
		console.log($('#modal-alert .modal-header h3').text());
		console.log($('#modal-alert .modal-body p').text());
		console.log(this.showResultErrors);
		this.showResultErrors.modal({
				    show: true				    
				});
	}

}
