import $ from 'jquery'

//opens navbar, sizes it and shows the right story
$('.masthead-sections__desktop ul li').mouseenter(function () {
  $('.navbar--desktop .navbar__story').hide()

  var navbarWidth = $('.masthead-sections').outerWidth(true);
  $('.mainbar-body .navbar--desktop').css('width', navbarWidth);
  $('.story-body .navbar--desktop').css('width', navbarWidth + 12);

  $('.navbar--desktop #nav-' + this.id).show()
  $('.navbar--desktop').show()
})

//NEED TO HIDE ON RESIZE, SWITCH TO MOBILE
//ALSO NEED TO FIX WEIRDNESS WITH HOVER IN MASTHEAD

//closes navbar
$('.navbar--desktop').mouseleave(function () {
  $('.navbar--desktop').hide()
  //because i'm only leaving after leaving navbar, but if you never get into navbar it doesn't work. poop
})

//simple mobile nav on click
$('.masthead-sections__mobile').click(function () {
  $('.navbar--mobile .navbar__story').toggle()
  $('.navbar--mobile').toggle()
})

//resize to switch from mobile to desktop nav if you resize
$(window).resize(function() {
  var windowWidth = $(window).width()
  var mobilenav = $('.navbar--mobile').css('display') == 'block' ? true : false

  if(windowWidth > 767 && mobilenav ) {
    $('.navbar--mobile .navbar__story').toggle()
    $('.navbar--mobile').toggle()
  }
})
