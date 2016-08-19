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

var State = Backbone.Model.extend({
	defaults: function() {
		return cat = {};
	},

	chooseCat: function (Cat) {
		this.set({
			'cat': Cat
		})
	}
});

var AppState = new State();

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

var CatSelectView = Backbone.View.extend({

	el: $(".cat-select"),

	selectTemplate: _.template($('script[data-template="selector"]').html()),

	events: {
		"change select": "onChange",
	},

	onChange: function (event) {
		this.model.appState.chooseCat(this.model.cats.findWhere({'name': event.target.value}));
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.selectTemplate({cats: this.model.cats}));
	}

});

var CatDisplayView = Backbone.View.extend({

	el: $(".cat-display"),

	catTemplate: _.template($('script[data-template="cat"]').html()),

	events: {
		"click img": "addClick",
	},

	addClick: function() {
		this.model.appState.get('cat').moreClicks();
	},

	initialize: function(parent) {
        this.listenTo(this.model.cats, 'change', this.render);
        this.listenTo(this.model.appState, 'change', this.render);
		this.render();
	},

	render: function() {
		this.$el.html();

		var html = this.catTemplate({cat: this.model.appState.get('cat')});
		this.$el.html(html);
	}

});

var AppView = Backbone.View.extend({

	model: {
		cats: Cats,
		appState: AppState
	},

	el: $(".cat-clicker"),

	subViews: {},

	addClick: function() {
		this.model.appState.moreClicks();
	},

	initialize: function() {		
		this.model.appState.chooseCat(this.model.cats.first());

		this.subViews.catSelect = new CatSelectView({model: this.model});
		this.subViews.catDisplay = new CatDisplayView({model: this.model});
	},
});

var App = new AppView();
