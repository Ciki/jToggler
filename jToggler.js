(function($) {
	"use strict";

	/**
	 * @name jToggler
	 * @description jQuery toggler plugin
	 * @version 1.0a
	 * @external "jQuery.fn"
	 * @author Ciki
	 * @license MIT http://www.opensource.org/licenses/mit-license.php
	 * @link http://www.github.com/Ciki/jToggler
	 * @example $('.toggler').jToggler({ handle: null });
	 *
	 * @param {Hash}					options					Settings object
	 * @param {String}					options.activeClass		Css class to toggle on toggler element (applied when target is visible)
	 * @param {String}					options.animType		Animation type [slide | fade]
	 * @param {String|Int}				options.animSpeed		Animation speed [slow | normal | fast | integer in ms]
	 * @param {String|jQuery Object}	options.target			Element to be toggled
	 * @param {String|jQuery Object}	options.handle			Element visually representing toggling state (e.g. used for showing labels Show|Hide). Defaults to descendant `span` element.
	 * @param {String}					options.showLabel		Label for `handle` when target is NOT visible
	 * @param {String}					options.hideLabel		Label for `handle` when target is visible
	 * @param {Function}				options.onComplete		Callback when animation(hide/show) completed. `function(settings, original) { ... }`
	 */
	$.fn.jToggler = function(options)
	{
		var defaults = {
			activeClass: 'active',
			animType: 'slide',
			animSpeed: 'normal',
			target: this.attr('data-nette-toggle-target') || this.parent().find('.toggler-content'),
			handle: this.find('span'),
			showLabel: 'Show',
			hideLabel: 'Hide',
			onComplete: function() {
			}
		},
		settings = $.extend({}, defaults, options),
				target = $(settings.target),
				handle = settings.handle,
				cb_onComplete = settings.onComplete,
				toggler = this;

		// callback after target got visible
		var cb_onShown = function() {
			if (settings.handle) {
				handle.text(settings.hideLabel)
						.addClass('toggle-handle-active');
			}
			toggler.addClass(settings.activeClass);
			cb_onComplete();
		};

		// callback after target got hidden
		var cb_onHidden = function() {
			if (settings.handle) {
				handle.text(settings.showLabel)
						.removeClass('toggle-handle-active');
			}
			toggler.removeClass(settings.activeClass);
			cb_onComplete();
		};

		// is target visible?
		var isVisible = function() {
			if (settings.animType === 'slide') {
				return target.css('display') !== 'none';
			} else if (settings.animType === 'fade') {
				return target.css('opacity') !== '0';
			}
		};

		// init on setup - no need to bother with classes in HTML
		if (isVisible()) {
			cb_onShown();
		} else {
			cb_onHidden();
		}

		// enable jQuery chain
		return this.click(function() {
			if (settings.animType === 'slide') {
				if (isVisible()) {
					target.slideUp(settings.animSpeed, cb_onHidden);
				} else {
					target.slideDown(settings.animSpeed, cb_onShown);
				}
			} else if (settings.animType === 'fade') {
				if (isVisible()) {
					target.fadeTo(settings.animSpeed, 0, cb_onHidden);
				} else {
					target.fadeTo(settings.animSpeed, 1, cb_onShown);
				}
			}
		});
	};
})(jQuery);