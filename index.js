/**
 * Toggle
 *
 * Toggle labels for the given element.
 *
 * Copyright (c) 2014 by Hsiaoming Yang.
 */

var classes = require('classes');
var events = require('event');


function Toggle(el, placeholder) {
  if (!(this instanceof Toggle)) {
    return new Toggle(el, placeholder);
  }
  el._class = classes(el);

  hover(el);

  var me = this;
  me.element = el;
  me.placeholder = placeholder || el;

  events.bind(el, 'click', function(e) {
    e.preventDefault();
    if (el._class.has('active')) {
      el._class.remove('active');
      me.off();
    } else {
      el._class.add('active');
      me.on();
    }
  });
}

// show on label
Toggle.prototype.on = function() {
  this.placeholder.innerHTML = this.element.getAttribute('data-on');
};

// show off label
Toggle.prototype.off = function() {
  this.placeholder.innerHTML = this.element.getAttribute('data-off');
};

module.exports = Toggle;


/**
 * Bind hover event for the given element.
 */
function hover(el) {
  events.bind(el, 'mouseenter', function() {
    var text;
    if (el._class.has('active')) {
      // on
      text = el.getAttribute('data-on-hover');
    } else {
      // off
      text = el.getAttribute('data-off-hover');
    }
    if (text) {
      el.innerHTML = text;
    }
  });
  events.bind(el, 'mouseleave', function() {
    var text;
    if (el._class.has('active')) {
      text = el.getAttribute('data-on');
    } else {
      text = el.getAttribute('data-off');
    }
    el.innerHTML = text;
  });
}
