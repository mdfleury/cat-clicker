(function ($, _) {
	'use strict';

	var init,
		getCatByName,
		catClick,
		templates = {},
		cats = [
		{
			'name': 'Fergie',
			'clicks': 0,
			'url': 'http://cdn.playbuzz.com/cdn/0079c830-3406-4c05-a5c1-bc43e8f01479/7dd84d70-768b-492b-88f7-a6c70f2db2e9.jpg'
		},
		{
			'name': 'Felix',
			'clicks': 0,
			'url': 'http://media1.santabanta.com/full1/Animals/Cats/cats-93a.jpg'
		},
		{
			'name': 'Garfield',
			'clicks': 0,
			'url': 'http://cdn.revistadonna.clicrbs.com.br/wp-content/uploads/sites/9/2014/07/Smiling_Cat.jpg'
		},
		{
			'name': 'Tom',
			'clicks': 0,
			'url': 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0'
		},
		{
			'name': 'Murphy',
			'clicks': 0,
			'url': 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0'
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
