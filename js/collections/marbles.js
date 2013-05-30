/*global Backbone */
var shifter = shifter || {};

(function () {
	'use strict';

	// Marble Collection
	// ---------------

	var MarbleList = Backbone.Collection.extend({
		model: shifter.Marble,
		localStorage: new Backbone.LocalStorage('marbles-backbone'),

		switch: function() {
			
		}
	});

	shifter.Marbles = new MarbleList();
})();
