/*global Backbone _ $  */
var shifter = shifter || {};

(function ($) {
	'use strict';

	// Marble View
	// --------------

	shifter.MarbleView = Backbone.View.extend({

		tagName:  'li',

		className: 'marble',

		color: null,
		colors: ['yellow', 'black', 'green', 'purple', 'red', 'blue', 'orange'],

		events: {
			'click': 'toggleActiveState'
		},

		initialize: function() {
			// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
			this.color = this.colors[Math.floor(Math.random() * (this.colors.length + 1))];
			this.listenTo(this.model, 'change:pos', this.updatePosition);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function() {
			this.$el.html(this.model.get('character')).addClass(this.model.get('type'));
			this.$el.addClass(this.color);
			this.updatePosition();
			return this;
		},

		updatePosition: function() {
			var pos = this.model.get('pos');
			this.$el.css({
				left: pos.x,
				top: pos.y
			});
		},

		toggleActiveState: function() {
			this.$el.toggleClass('active');
			this.model.set('selected', this.$el.hasClass('active'));
		}
	});
})(jQuery);