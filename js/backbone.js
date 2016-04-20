var Cat = Backbone.Model.extend({
	defaults: function() {
		return {
			name: "",
			image: "",
			clicks: 0
		};
	},

	moreClicks: function() {
		this.set({
			clicks: this.get("clicks") + 1
		});
	}
});

var CatList = Backbone.Collection.extend({
	model: Cat,
	comparator: 'name'
});

var initialCats = [
	new Cat({
		'name': 'Fergie',
		'image': 'http://cdn.playbuzz.com/cdn/0079c830-3406-4c05-a5c1-bc43e8f01479/7dd84d70-768b-492b-88f7-a6c70f2db2e9.jpg'
	}),
	new Cat({
		'name': 'Felix',
		'image': 'http://media1.santabanta.com/full1/Animals/Cats/cats-93a.jpg'
	}),
	new Cat({
		'name': 'Garfield',
		'image': 'http://cdn.revistadonna.clicrbs.com.br/wp-content/uploads/sites/9/2014/07/Smiling_Cat.jpg'
	}),
	new Cat({
		'name': 'Tom',
		'image': 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0'
	}),
	new Cat({
		'name': 'Murphy',
		'image': 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0'
	})
];

var Cats = new CatList(initialCats);

var AppView = Backbone.View.extend({

	model: Cats,
	el: $("#catclicker"),

	catTemplate: _.template($('script[data-template="cat"]').html()),
	selectTemplate: _.template($('script[data-template="selector"]').html()),

	events: {
		"click img": "addClick",
	},

	addClick: function() {
		this.chosenCat.moreClicks();
	},

	initialize: function() {
		this.chosenCat = Cats.first();
        this.listenTo(this.model, 'change', this.render);
		this.render();
	},

	render: function() {
		this.$el.html(this.catTemplate(this.chosenCat.attributes));
	}

});

// Finally, we kick things off by creating the **App**.
var App = new AppView();
