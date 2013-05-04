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
			this.color = this.colors[Math.floor(Math.random() * (this.colors.length + 1))]; // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function() {
			var pos = this.model.get('pos');
			this.$el.html(this.model.get('character')).addClass(this.model.get('type'));
			this.$el.css({
				left: pos.x,
				top: pos.y
			});
			this.$el.addClass(this.color);
			return this;
		},

		toggleActiveState: function() {
			this.$el.toggleClass('active');
			this.model.set('selected', this.$el.hasClass('active'));
		}
	});
})(jQuery);