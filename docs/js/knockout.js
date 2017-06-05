function Cat(name, url) {
	var self = this;
	self.name = name;
	self.url = url;
	self.clicks = ko.observable(0);

	self.addClick = function (cat) {
		cat.clicks(cat.clicks() + 1);
	};
}

function CatClickerViewModel() {
	var self = this;

	// Editable data
	self.cats = ko.observableArray([
		new Cat("Adam", 'https://mdfleury.github.io/cat-clicker/images/cat1.jpg'),
		new Cat("Bill", 'https://mdfleury.github.io/cat-clicker/images/cat2.jpg'),
		new Cat("Chris", 'https://mdfleury.github.io/cat-clicker/images/cat3.jpg'),
		new Cat("David", 'https://mdfleury.github.io/cat-clicker/images/cat4.jpg'),
		new Cat("Ebert", 'https://mdfleury.github.io/cat-clicker/images/cat5.jpg')
	]);

	self.chosenCat = ko.observable(self.cats()[0]);

	self.goToCat = function(cat) {
		self.chosenCat(cat);
	};
}

ko.applyBindings(new CatClickerViewModel());
