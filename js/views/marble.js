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
		colours: ['yellow', 'black', 'green', 'purpur', 'red', 'blue', 'orange'],

		events: {
			'click': 'toggleActiveState'
		},

		initialize: function() {
			this.color = this.colours[Math.round(Math.random(this.colours.length) * 10)];
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