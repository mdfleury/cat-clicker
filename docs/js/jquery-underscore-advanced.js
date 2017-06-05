(function ($, _) {
	'use strict';

	var initialCats = [
		{
			'name': 'Adam',
			'url': 'https://mdfleury.github.io/cat-clicker/images/cat1.jpg'
		},
		{
			'name': 'Bill',
			'url': 'https://mdfleury.github.io/cat-clicker/images/cat2.jpg'
		},
		{
			'name': 'Chris',
			'url': 'https://mdfleury.github.io/cat-clicker/images/cat3.jpg'
		},
		{
			'name': 'David',
			'url': 'https://mdfleury.github.io/cat-clicker/images/cat4.jpg'
		},
		{
			'name': 'Ebert',
			'url': 'https://mdfleury.github.io/cat-clicker/images/cat5.jpg'
		}
	];

	window.view = (function () {
		var init,
			showCat,
			updateClicks,
			templates = {};

		init = function () {
			var options = [];

			_.each(presenter.getCats(), function (cat) {
				options.push('<option>' + cat.name + '</option>');
			});

			$('#cat-picker').html(options.join());

			$('#cat-picker').on('change', presenter.switchCat);

			templates.cat = _.template($('script[data-template="cat"]').html());
			templates.click = _.template("Clicked <%= clicks %> times");

			$('.cat').on('click', presenter.catClick);
		};

		showCat = function (cat) {
			$('#cat-display').html(templates.cat(cat));
			$('.cat').on('click', presenter.catClick);
		};

		updateClicks = function (cat) {
			$('.clicks').text(templates.click(cat));
		};

		return {
			'showCat': showCat,
			'updateClicks': updateClicks,
			'init': init
		};
	})();

	window.model = (function () {
		var cats = [],
			addCat,
			getCats,
			getCatByName;

		addCat = function (cat) {
			cats.push({
				'name': cat.name,
				'clicks': 0,
				'url': cat.url
			});
		};

		getCats = function () {
			return cats;
		};

		getCatByName = function (name) {
			return _.find(cats, function (cat) {
				return cat.name === name;
			});
		};

		return {
			'addCat' : addCat,
			'getCats': getCats,
			'getCatByName': getCatByName
		};
	})();

	window.presenter = (function () {
		var init,
			catClick,
			getCats,
			getCatByName,
			switchCat;

		catClick = function (event) {
			var $target = $(event.currentTarget),
			cat = model.getCatByName($target.data('name'));
			cat.clicks++;
			view.updateClicks(cat);
		};

		init = function () {
			var cat = {},
				allCats = [];

			_.each(initialCats, function (cat) {
				model.addCat(cat);
			});

			allCats = model.getCats();

			cat = _.first(allCats);

			view.init();
			view.showCat(cat);
		};

		getCats = function () {
			return model.getCats();
		};

		getCatByName = function (name) {
			return model.getCatByName(name);
		};

		switchCat = function (event) {
			var cat = model.getCatByName($('#cat-picker').val());
			view.showCat(cat);
		};

		return {
			'catClick': catClick,
			'getCats': getCats,
			'getCatByName': getCatByName,
			'switchCat': switchCat,
			'init': init
		};
	})();

	presenter.init();

}($, _));
