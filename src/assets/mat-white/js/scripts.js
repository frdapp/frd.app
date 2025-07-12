$('.slideshow').carousel ({
	interval: false,
	wrap: false
});

$(document).ready(function(){
	$('body').addClass('loaded');
	$('.dropdown-toggle').click(function(){
		$(this).parents('li').find('.dropdown-menu').slideToggle();
		$('.dropdown-toggle').not(this).parents('li').find('.dropdown-menu').slideUp();
	});
	
	
});


function checkForInput(element) {
  // element is passed to the function ^
  
  const $label = $(element).siblings('label');

  if ($(element).val().length > 0) {
    $label.addClass('input-has-value');
  } else {
    $label.removeClass('input-has-value');
  }
}

// The lines below are executed on page load
$('.form-group input').each(function() {
  checkForInput(this);
});

// The lines below (inside) are executed on change & keyup
$('.form-group input').on('change keyup', function() {
  checkForInput(this);  
});


$('#nav-toggle').click(function() {
  
  $( ".close" ).trigger( "click" );

  if ($(this).hasClass("navBtnActive") ) 
  {
    $( "#bs-navbar" ).animate({ left: "-300px"}, 300 );
    $(this).removeClass('navBtnActive');
    $('body').removeClass('scroll-stop');
  } 
  else 
  {
    $( "#bs-navbar" ).animate({ left: "0" }, 300 );
    $(this).addClass('navBtnActive');
    $('body').addClass('scroll-stop');
  } 
});

$('.close').click(function() {
  $( "#bs-navbar" ).animate({ left: "-300px"}, 300 );
  $("#nav-toggle").removeClass('navBtnActive');
  $('body').removeClass('scroll-stop');
});



$('#toggle-form').click(function() {
  

  if ($(this).hasClass("navBtnActive") ) 
  {
    $( "#form-expand" ).animate({ right: "-66.66667%"}, 300 );
    $(this).removeClass('navBtnActive');
  } 
  else 
  {
    $( "#form-expand" ).animate({ right: "0" }, 300 );
    $(this).addClass('navBtnActive');
  } 
 
});


(function($) {

 $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);

var win = $(window);

var allMods = $(".module");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible"); 
  } 
});

win.scroll(function(event) {
  
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in"); 
    } 
  });
  
});

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
        $(".clearheader").addClass("darkheader");
    } else {
        $(".clearheader").removeClass("darkheader");
    }
});


function visibleElement(){	
	if ($(window).width() > 300) {
	$(".animate").each(function() { 
	var windowPos = $(window).scrollTop();
	var reqPos = $(window).scrollTop()+($(window).height()-50);
	var btnTopOffset = $( this ).offset().top-75;
	if (btnTopOffset < reqPos) { $( this ).addClass('begin-animate'); } else { $( this ).removeClass('begin-animate'); }
	});
}}
$(window).scroll(function () {
visibleElement();
});

$(".open-pushmenu").click(function () {
    $(".push-menu-right").addClass('push-right-body');
});

$(".close-nav-5").click(function () {
	$(".push-menu-right").removeClass('push-right-body');
});

$('.has-dropdown').click(function(){
	$(this).toggleClass('active');
	$('.has-dropdown').not(this).removeClass('active');
	$($(this).find('a').attr('href')).slideToggle();
	$('.drop-menu-content').not($(this).find('a').attr('href')).slideUp();
});



$('.navigation-02 .dropdown').click(function() {
    $(this).addClass('move-arrow');
	$(this).removeClass('move-arrow');
});

$(document).ready(function () {
    $(".navigation .dropdown .dropdown-toggle").click(function () {
        $(".navigation .dropdown .dropdown-toggle").not($(this)).removeClass("move-menu-arrow");
        $(this).toggleClass("move-menu-arrow");
    });
});

$(document).ready(function () {
  visibleElement();
    $(".mba-settings .dropdown .dropdown-toggle").click(function () {
        $(".mba-settings .dropdown .dropdown-toggle").not($(this)).removeClass("move-menu-arrow");
        $(this).toggleClass("move-menu-arrow");
    });
	
	if(window.location.hash == '#menu-preview'){
		$('#nav-toggle').trigger('click');
	}
	
});



// Favorite Button - Heart
$('.favme').click(function() {
	$(this).toggleClass('active');
});

// share js 

  (function(){
  
  var shareButtons = document.querySelectorAll(".share-btn");

  if (shareButtons) {
      [].forEach.call(shareButtons, function(button) {
      button.addEventListener("click", function(event) {
 				var width = 650,
            height = 450;

        event.preventDefault();

        window.open(this.href, 'Share Dialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+(screen.height/2-height/2)+',left='+(screen.width/2-width/2));
      });
    });
  }

})();



$(document).ready(function(){
    $(".dynt-btn").click(function(){
        $(".theme-night").toggleClass("theme-day");
    }); 
});


/*
var myApp = angular.module('App', []);

myApp.controller('AppController', function($scope) {
  $scope.lightswitch = 'off';
  $scope.switchTheme = function() {
    var checkProperty = document.getElementById('myonoffswitch').checked;
    if (checkProperty) {
      $scope.lightswitch = 'on';
    } else {
      $scope.lightswitch = 'off';
    }
  }
});
*/


$(document).ready(function() {

//if($.isFunction('owlCarousel')){
 $('.fadeOut').owlCarousel({
                items:3,
               
                loop: true,
                margin:20,
        nav: true,
        dots: false,
        responsive: {
                  0: {
                    items: 1
                  },
                  600: {
                    items: 1
                  },
          1024: {
                    items:2
                  },
                  1200: {
                    items:2
                  },
                 
                }
              });
//}
        });