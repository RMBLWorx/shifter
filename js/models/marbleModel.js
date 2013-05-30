/*global Backbone */
var shifter = shifter || {};

(function () {
	'use strict';

	// Marble Model
	// ----------

	shifter.Marble = Backbone.Model.extend({

		defaults: {
			pos: {
				x: 0,
				y: 0
			},
			selected: false,
			active: false,
			character: '',
			type: 'red'
		}

	});
})();