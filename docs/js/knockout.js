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
		new Cat("Fergie", 'http://cdn.playbuzz.com/cdn/0079c830-3406-4c05-a5c1-bc43e8f01479/7dd84d70-768b-492b-88f7-a6c70f2db2e9.jpg'),
		new Cat("Felix", 'http://media1.santabanta.com/full1/Animals/Cats/cats-93a.jpg'),
		new Cat("Garfield", 'http://cdn.revistadonna.clicrbs.com.br/wp-content/uploads/sites/9/2014/07/Smiling_Cat.jpg'),
		new Cat("Tom", 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0'),
		new Cat("Murphy", 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0')
	]);

	self.chosenCat = ko.observable(self.cats()[0]);

	self.goToCat = function(cat) {
		self.chosenCat(cat);
	};
}

ko.applyBindings(new CatClickerViewModel());
