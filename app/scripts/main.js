'use strict';

import $ from 'jquery';
import d3 from 'd3';

/* global $, d3, stack */


// var mystack = stack();
$('.masthead-sections__desktop ul li').mouseenter(function() {
  $('.navbar--desktop .navbar__story').hide();

  $('.navbar--desktop #nav-' + this.id).show();
  $('.navbar--desktop').show();
});

//NEED TO HIDE THESE BASED ON RESIZE

$('.navbar--desktop').mouseleave(function() {
  $('.navbar--desktop').hide();
});

$('.masthead-sections__mobile').click(function() {
  $('.navbar--mobile .navbar__story').toggle();
  $('.navbar--mobile').toggle();
});
