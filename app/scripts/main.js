'use strict';

import $ from 'jquery';
import d3 from 'd3';

/* global $, d3, stack */


// var mystack = stack();
$('.masthead-sections').mouseover(function() {
  $('.navbar').show();
});

$('.navbar').mouseout(function() {
  $('.navbar').hide();
});
