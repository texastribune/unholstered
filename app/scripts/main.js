'use strict';

import $ from 'jquery';
import d3 from 'd3';

/* global $, d3, stack */


// var mystack = stack();
$('.masthead-sections ul li').mouseenter(function() {
  $('.navbar__story').hide();

  $('#nav-' + this.id).show();
  $('.navbar').show();
});


// $('.navbar').mouseleave(function() {
//   $('.navbar').hide();
// });
