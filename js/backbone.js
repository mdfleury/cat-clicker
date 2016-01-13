$(function() {

	var Cat = Backbone.Model.extend({
		defaults: function() {
			return {
				name: "",
				image: "",
				clicks: 0
			};
		},

		// Toggle the `done` state of this todo item.
		addClick: function() {
			this.save({
				clicks: this.get("clicks") + 1
			});
		}

	});

	var CatList = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: Cat,

		// Todos are sorted by their original insertion order.
		comparator: 'name'

	});

	var Cats = new CatList();

	// Todo Item View
	// --------------

	// The DOM element for a todo item...
	var CatView = Backbone.View.extend({

		//... is a list tag.
		tagName: "li",

		// Cache the template function for a single item.
		template: _.template($('#item-template').html()),

		// The DOM events specific to an item.
		events: {
			"click .toggle": "toggleDone",
			"dblclick .view": "edit",
			"click a.destroy": "clear",
			"keypress .edit": "updateOnEnter",
			"blur .edit": "close"
		},

		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		// Re-render the titles of the todo item.
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('done', this.model.get('done'));
			this.input = this.$('.edit');
			return this;
		}

	});

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: $("#catclicker"),

		// Our template for the line of statistics at the bottom of the app.
		statsTemplate: _.template($('#stats-template').html()),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			"keypress #new-todo": "createOnEnter",
			"click #clear-completed": "clearCompleted",
			"click #toggle-all": "toggleAllComplete"
		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function() {
			this.chosenCat = Cats.first();
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function() {
			var done = Cats.done().length;
			var remaining = Cats.remaining().length;

			if (Cats.length) {
				this.main.show();
				this.footer.show();
				this.footer.html(this.statsTemplate({
					done: done,
					remaining: remaining
				}));
			} else {
				this.main.hide();
				this.footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		}

	});

	// Finally, we kick things off by creating the **App**.
	var App = new AppView();

});
