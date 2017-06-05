(function ($, _) {
	'use strict';

	var init,
		getCatByName,
		catClick,
		templates = {},
		cats = [
		{
			'name': 'Adam',
			'clicks': 0,
			'url': 'https://mdfleury.github.io/cat-clicker/images/cat1.jpg'
		},
		{
			'name': 'Bill',
			'clicks': 0,
			'url': 'https://mdfleury.github.io/cat-clicker/images/cat2.jpg'
		},
		{
			'name': 'Chris',
			'clicks': 0,
			'url': 'https://mdfleury.github.io/cat-clicker/images/cat3.jpg'
		},
		{
			'name': 'David',
			'clicks': 0,
			'url': 'https://mdfleury.github.io/cat-clicker/images/cat4.jpg'
		},
		{
			'name': 'Ebert',
			'clicks': 0,
			'url': 'https://mdfleury.github.io/cat-clicker/images/cat5.jpg'
		}
	];

	templates.cat = _.template(
'<div class="cat" data-name="<%= name %>">' +
'<p><%= name %></p>' +
'<img src="<%= url %>"/>' +
'<p class="clicks">Clicked <%= clicks %> times</p>' +
'</div>'
	);
	templates.click = _.template("Clicked <%= clicks %> times");

	init = function () {
		var cat = _.first(cats),
			options = [];

		$('#cat-display').html(templates.cat(cat));

		_.each(cats, function (cat) {
			options.push('<option>' + cat.name + '</option>');
		});

		$('#cat-picker').html(options.join());

		$('#cat-picker').on('change', function (event) {
			var cat = getCatByName($('#cat-picker').val());
			$('#cat-display').html(templates.cat(cat));
			$('.cat').on('click', catClick);
		});

		$('.cat').on('click', catClick);
	};

	getCatByName = function (name) {
		return _.find(cats, function (cat) {
			return cat.name === name;
		});
	};

	catClick = function (event) {
		var $target = $(event.currentTarget),
			cat = getCatByName($target.data('name'));
		cat.clicks++;
		$('.clicks', $target).text(templates.click(cat));
	};

	init();

}($, _));
