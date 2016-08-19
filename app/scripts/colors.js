import $ from 'jquery'

export default function changeColors(activeSlide) {
  //removes color of unholstered tab
  $('.masthead-title').removeClass((function (index, css) {
    return (css.match (/(^|\s)bg-\S+/g) || []).join(' ');
  }))

  //removes pagination color
  $('.swiper-pagination-progress').removeClass((function (index, css) {
    return (css.match (/(^|\s)bg-\S+/g) || []).join(' ');
  }))

  //figures out what color it should be
  let bgColor = '';
  for (var i=0; i < activeSlide.length; i++) {
    if (activeSlide[i].includes('bg-')) {
      bgColor = activeSlide[i]
    }
  }

  //sets color for both divs
  $('.masthead-title').addClass(bgColor);
  $('.swiper-pagination-progress').addClass(bgColor);
}
