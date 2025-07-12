$(document).ready(function() {
 // executes when HTML-Document is loaded and DOM is ready

// breakpoint and up  
$(window).resize(function(){
	if ($(window).width() >= 980){	

      // when you hover a toggle show its dropdown menu
      $(".navbar .dropdown-toggle").hover(function () {
         $(this).parent().toggleClass("show");
         $(this).parent().find(".dropdown-menu").toggleClass("show"); 
       });

        // hide the menu when the mouse leaves the dropdown
      $( ".navbar .dropdown-menu" ).mouseleave(function() {
        $(this).removeClass("show");  
      });
  
		// do something here
	}	
});  
  
  

// document ready  
});

/*nav 4*/
$('#nav-toggle4').click(function() {
  
  $( ".close4" ).trigger( "click" ); 

  if ($(this).hasClass("navBtnActive4") ) 
  {
    $( "#bs-navbar4" ).animate({ left: "-100%"}, 250 );
    $(this).removeClass('navBtnActive4');
    
  } 
  else 
  {
    $( "#bs-navbar4" ).animate({ left: "0" }, 250 );
    $(this).addClass('navBtnActive4');
    $('body').addClass('theme-nav4');
    $('body').removeClass('normal-state4');
  } 
});

$('.close4').click(function() {
  $( "#bs-navbar4" ).animate({ left: "-100%"}, 250 );
  $("#nav-toggle4").removeClass('navBtnActive1');
  $('body').removeClass('theme-nav4');
  $('body').addClass('normal-state4');
  setTimeout( function(){ $('body').removeClass("normal-state4"); }, 750 );
});


