$(document).ready(function(){
  // Ajax Global Functions

  // Fires at beginning of Ajax Request
  $(document).ajaxStart(function(){

  }).ajaxSend(function(event, xhr, options){
    //clear todos
    if(options.type !== 'POST'){
      $('#todos').html('');
    }
  }).ajaxComplete(function(event, xhr, options){
    /////////////////
  }).ajaxError(function( event, request, settings ) {
     // Fires when an Ajax Error Occurs
     $( "#msg" ).append( "<p>Error requesting page " + settings.url + "<p>" );
   });

  });
