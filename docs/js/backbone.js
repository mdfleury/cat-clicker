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
		return {};
	},

	chooseCat: function (Cat) {
		this.set({
			'cat': Cat
		});
	}
});

var AppState = new State();

var CatList = Backbone.Collection.extend({
	model: Cat,
	comparator: 'name'
});

var initialCats = [
	new Cat({
		'name': 'Adam',
		'image': 'https://mdfleury.github.io/cat-clicker/images/cat1.jpg'
	}),
	new Cat({
		'name': 'Bill',
		'image': 'https://mdfleury.github.io/cat-clicker/images/cat2.jpg'
	}),
	new Cat({
		'name': 'Chris',
		'image': 'https://mdfleury.github.io/cat-clicker/images/cat3.jpg'
	}),
	new Cat({
		'name': 'David',
		'image': 'https://mdfleury.github.io/cat-clicker/images/cat4.jpg'
	}),
	new Cat({
		'name': 'Ebert',
		'image': 'https://mdfleury.github.io/cat-clicker/images/cat5.jpg'
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
