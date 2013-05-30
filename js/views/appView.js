/*global Backbone _ $ */
var shifter = shifter || {};

(function ($) {
	'use strict';

	shifter.AppView = Backbone.View.extend({

		el: '#shifter',

		animating: false,

		events: {
			transEndEventName : 'finishedAnimation'
		},

		initialize: function () {
			this.listenTo(shifter.Marbles, 'change:selected', shifter.Marbles.switch);
			var left = 10,
				top = 10,
				i = 0;
			shifter.Marbles.fetch();
			shifter.Marbles.reset();
			for (; i < 17; i++) {
				left += 110;
				if (i === 5 || i === 11) {
					top += 110;
					left = 120;
				}
				shifter.Marbles.create({
					pos: {
						x: left,
						y: top
					},
					active: false,
					character: i + ' '
				});
			}
			this.addAll();
		},

		render: function () {
			return this;
		},

		addOne: function (marble) {
			var view = new shifter.MarbleView({
				model: marble
			});
			$('#marble-list').append(view.render().el);
		},

		addAll: function () {
			this.$('#marble-list').html('');
			shifter.Marbles.each(this.addOne, this);
		},

		finishedAnimation: function() {
			this.animating = false;
		}
	});
})(jQuery);
