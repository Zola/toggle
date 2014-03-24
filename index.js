/**
 * Toggle
 *
 * Toggle labels for the given element.
 *
 * Copyright (c) 2014 by Hsiaoming Yang.
 */

var query = require('query');
var classes = require('classes');
var events = require('event');
var emitter = require('emitter');


function Toggle(el) {
  if (!(this instanceof Toggle)) {
    return new Toggle(el);
  }
  el._class = el._class || classes(el);
  el._class.add('toggle');

  var me = this;
  me.el = el;

  if (!query('.toggle-hover-active', el)) {
    query('.toggle-inner-active', el).className += ' toggle-hover-active';
  }

  if (!query('.toggle-hover-inactive', el)) {
    query('.toggle-inner-inactive', el).className += ' toggle-hover-inactive';
  }

  events.bind(el, 'click', function(e) {
    e.preventDefault();
    if (el._class.has('toggle-active')) {
      me.emit('inactive');
      me.inactive();
    } else {
      me.emit('active');
      me.active();
    }
  });
}
emitter(Toggle.prototype);

// show on label
Toggle.prototype.active = function() {
  this.el._class.add('toggle-active');
};

// show off label
Toggle.prototype.inactive = function() {
  this.el._class.remove('toggle-active');
};

module.exports = Toggle;
