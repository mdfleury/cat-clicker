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
