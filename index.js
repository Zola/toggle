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

  var me = this;
  me.element = el;
  me.placeholder = placeholder || el;

  me.dataOn = el.getAttribute('data-on') || '';
  me.dataOff = el.getAttribute('data-off') || '';
  me.dataOnHover = el.getAttribute('data-on-hover') || '';
  me.dataOffHover = el.getAttribute('data-off-hover') || '';

  hover(el, me);
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
  this.placeholder.innerHTML = this.dataOn;
};

// show off label
Toggle.prototype.off = function() {
  this.placeholder.innerHTML = this.dataOff;
};

module.exports = Toggle;


/**
 * Bind hover event for the given element.
 */
function hover(el, ctx) {
  events.bind(el, 'mouseenter', function() {
    var text;
    if (el._class.has('active')) {
      // on
      text = ctx.dataOnHover;
    } else {
      // off
      text = ctx.dataOffHover;
    }
    if (text) {
      el.innerHTML = text;
    }
  });
  events.bind(el, 'mouseleave', function() {
    var text;
    if (el._class.has('active')) {
      text = ctx.dataOn;
    } else {
      text = ctx.dataOff;
    }
    el.innerHTML = text;
  });
}
