(function ($, _) {
	'use strict';

	var initialCats = [
		{
			'name': 'Fergie',
			'url': 'http://cdn.playbuzz.com/cdn/0079c830-3406-4c05-a5c1-bc43e8f01479/7dd84d70-768b-492b-88f7-a6c70f2db2e9.jpg'
		},
		{
			'name': 'Felix',
			'url': 'http://media1.santabanta.com/full1/Animals/Cats/cats-93a.jpg'
		},
		{
			'name': 'Garfield',
			'url': 'http://cdn.revistadonna.clicrbs.com.br/wp-content/uploads/sites/9/2014/07/Smiling_Cat.jpg'
		},
		{
			'name': 'Tom',
			'url': 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0'
		},
		{
			'name': 'Murphy',
			'url': 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0'
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
