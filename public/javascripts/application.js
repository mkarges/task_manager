
$(document).ready(function() {	
	
 $(function() { 
   var $modal = $('#modal'),
       $modal_close = $modal.find('.close'),
       $modal_container = $('#modal-container');
 

   $('a[data-remote]').live('ajax:beforeSend', function(e, xhr, settings){
     xhr.setRequestHeader('accept', '*/*;q=0.5, text/html, ' + settings.accepts.html);
   });
 
   // Handle modal links with the data-remote attribute
   $('a[data-remote]').live('ajax:success', function(xhr, data, status){
     $modal
       .html(data)
       .prepend($modal_close)
       .css('top', $(window).scrollTop() + 40)
       .show();
     $modal_container.show();
     $('#task_set_date').datepicker();
     $('#selectPatron').change(function() 
	   { 
       if ($("#selectPatron option[value='2']").attr('selected')) {
		 $(".groupLink").css( {visibility: "visible"} )
       }
     });
   });
   // Hide close button click
   $('.close', '#modal').live('click', function(){
     $modal_container.hide();
     $modal.hide();
     return false;
   });
 });
 
	$('.submittable').click(function() {
	  var parentElement = $(this).parent();
	  $(parentElement).hide('slow');
	});

    $('#selectPatron').change(function() 
	   { 
       if ($("#selectPatron option[value='2']").attr('selected')) {
		 $(".groupLink").css( {visibility: "visible"} )
       }
     });


});