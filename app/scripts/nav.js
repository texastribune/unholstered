import $ from 'jquery'

$('.masthead-sections__desktop ul li').mouseenter(function () {
  $('.navbar--desktop .navbar__story').hide()

  var navbarWidth = $('.masthead-sections').outerWidth(true);
  $('.mainbar-body .navbar--desktop').css('width', navbarWidth);
  $('.story-body .navbar--desktop').css('width', navbarWidth + 12);

  $('.navbar--desktop #nav-' + this.id).show()
  $('.navbar--desktop').show()
})

//NEED TO HIDE ON RESIZE, SWITCH TO MOBILE

$('.navbar--desktop').mouseleave(function () {
  $('.navbar--desktop').hide()
})

$('.masthead-sections__mobile').click(function () {
  $('.navbar--mobile .navbar__story').toggle()
  $('.navbar--mobile').toggle()
})
