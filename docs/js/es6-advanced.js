const store = {
	cats: [],
	currentCat: {},
	clickCat() {
		store.currentCat.clicks++;
	},
	updateCat(name) {
		if (name !== null) {
			store.currentCat = store.cats.find((cat) => cat.name === name);
		}
	}
};

const view = {
	init(cats) {
		let selectHtml = ''; 
		for (cat of cats) {
			selectHtml += `<option>${cat.name}</option>`;
		}

		document.getElementById('cat-picker').innerHTML = selectHtml;
		document.getElementById('cat-picker').addEventListener('change', ({target: {value: cat}}) => {
			let event = new Event('catChange');
			event.catName = cat;
			document.dispatchEvent(event);
		});
	},
	update(cat) {
		document.getElementById('cat-display').innerHTML = `<div class="cat">
<p>${cat.name}</p>
<img src="${cat.url}"/>
<p class="clicks">Clicked ${cat.clicks} times</p>
</div>`;
		document.querySelector('#cat-display img').addEventListener('click', () => document.dispatchEvent(new Event('catClick')));
	}
};

const catClicker = {
	init() {
		store.cats = [
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

		store.currentCat = store.cats[0];
		view.init(store.cats);
		view.update(store.currentCat);

		document.addEventListener('catChange', (event) => {
			store.updateCat(event.catName);
			view.update(store.currentCat);
		});
		document.addEventListener('catClick', () => {
			store.clickCat();
			view.update(store.currentCat);
		});
	}
};

catClicker.init();
