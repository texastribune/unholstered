import $ from 'jquery'

//swaps color of masthead sections when you scroll past the header block
var storyHeaderHt = $('.sty-header').height()

var styHeader = $('.story-body').attr('class')
var bgColor = '';
if (styHeader) {
  bgColor = styHeader.split(" ")
}

$(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;

    if(y_scroll_pos > storyHeaderHt) {
      $('.story-body').removeClass((function (index, css) {
        return (css.match (/(^|\s)bg-\S+/g) || []).join(' ');
      }))
    }

    if(y_scroll_pos < storyHeaderHt) {
      $('.story-body').addClass(bgColor[1]);
    }
});
