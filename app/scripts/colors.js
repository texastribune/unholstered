import $ from 'jquery'


// .masthead-mainbar & {
//   background-color: $light-blue;
//
//   &:before,
//   &:after {
//     background-color: $light-blue;
//   }
//
// }

export default function changeColors(activeSlide) {
  $('.masthead-title').removeClass((function (index, css) {
    return (css.match (/(^|\s)bg-\S+/g) || []).join(' ');
  }))

  let bgColor = '';
  for (var i=0; i < activeSlide.length; i++) {
    if (activeSlide[i].includes('bg-')) {
      bgColor = activeSlide[i]
    }
  }

  $('.masthead-title').addClass(bgColor);
}
