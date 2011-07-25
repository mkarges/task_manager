$(document).ready(function() {	
	$('.submittable').click(function() {
	  var parentElement = $(this).parent();
	  $(parentElement).hide('slow');
	});
});