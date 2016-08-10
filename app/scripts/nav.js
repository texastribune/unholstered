import $ from 'jquery'

// var mystack = stack()
$('.masthead-sections__desktop ul li').mouseenter(function () {
  $('.navbar--desktop .navbar__story').hide()

  // $('.masthead').css({'border-bottom': '0', 'height': '2em'})

  $('.navbar--desktop #nav-' + this.id).show()
  $('.navbar--desktop').show()
})

$('.navbar--desktop').mouseleave(function () {
  $('.navbar--desktop').hide()

// $('.masthead').css({'border-bottom': '.5em solid white', 'height': '2.5em'})
})

$('.masthead-sections__mobile').click(function () {
  $('.navbar--mobile .navbar__story').toggle()
  $('.navbar--mobile').toggle()
})
