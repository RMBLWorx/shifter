window.shifter = window.shifter || {};

shifter.init = function() {
	var marble_collection = document.getElementsByClassName('marble');
	var is_animating = false;

	var left = 10;
	var top = 10;

	for (var i = 0; i < marble_collection.length; i++) {
		left += 110;
		if (i === 5 || i === 11) {
			top += 110;
			left = 120;
		}
		marble_collection[i].style.top = (top + 50) + 'px';
		marble_collection[i].style.left = (left + 50) + 'px';
		marble_collection[i].dataset.top = top;
		marble_collection[i].dataset.left = left;
	}

	var active_marble_collection = [];
	var active_marble = null;

	var switch_marble = function() {
		var foo = active_marble_collection;
		var l1 = foo[0].style.left;
		var l2 = foo[1].style.left;
		var t1 = foo[0].style.top;
		var t2 = foo[1].style.top;
		foo[0].classList.remove('active');
		foo[1].classList.remove('active');
		foo[0].style.left = l2;
		foo[1].style.left = l1;
		foo[0].style.top = t2;
		foo[1].style.top = t1;
		active_marble_collection = [];
	};

	document.body.addEventListener((Modernizr.touch ? 'touchstart': 'mousedown'), function(event) {
		var marble = event.target;
		if (!is_animating && marble.classList.contains('marble') && marble.classList.contains('active')) {
			event.preventDefault();
			marble.classList.remove('active');
			active_marble_collection = [];
			return;
		}
		if (!is_animating && marble.classList.contains('marble') && !marble.classList.contains('active')) {
			document.body.classList.add('mousedown');
			event.preventDefault();
			if (active_marble_collection.length < 3) {
				marble.classList.add('active');
				active_marble_collection.push(marble);
				active_marble = marble;
			}
			if (active_marble_collection.length === 2) {
				is_animating = true;
				setTimeout(switch_marble, 150);
			}
		}
	}, false);

	document.body.addEventListener((Modernizr.touch ? 'touchend': 'mouseup'), function(event) {
		var marble = (event.changedTouches) ?  document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY) : event.target;
		document.body.classList.remove('mousedown');
		if (!is_animating && marble.classList.contains('marble') && marble !== active_marble && active_marble_collection.length === 1) {
			marble.classList.add('active');
			active_marble_collection.push(marble);
			if (active_marble_collection.length === 2) {
				is_animating = true;
				setTimeout(switch_marble, 150);
			}
		}
		active_marble = null;
	}, false);

	var transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'msTransition': 'MSTransitionEnd',
		'transition': 'transitionend'
	},
	transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

	document.body.addEventListener(transEndEventName, function(event) {
		is_animating = false;
	}, false);
	setTimeout(function() {
		for (var i = 0; i < marble_collection.length; i++) {
			marble_collection[i].classList.remove('small');
			marble_collection[i].style.top = marble_collection[i].dataset.top + 'px';
			marble_collection[i].style.left = marble_collection[i].dataset.left + 'px';
		}
	}, 500);
};

shifter.init();