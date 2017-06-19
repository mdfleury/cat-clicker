//jshint esversion: 6

(function () {
	const cats = [
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

	let currentCat;

	const init = function () {
		currentCat = cats[0];
		let selectHtml = '';
		for (let cat of cats) {
			selectHtml += `<option>${cat.name}</option>`;
		}

		document.getElementById('cat-picker').innerHTML = selectHtml;
		document.getElementById('cat-picker').addEventListener('change', (event) => update(event.target.value));

		update();
	};

	const update = function (name = null) {
		if (name !== null) {
			currentCat = cats.find((cat) => cat.name === name);
		}

		document.getElementById('cat-display').innerHTML = `<div class="cat">
<p class="name">${currentCat.name}</p>
<img src="${currentCat.url}"/>
<p class="clicks">Clicked ${currentCat.clicks} times</p>
</div>`;

		document.querySelector('#cat-display img').addEventListener('click', () => {
			currentCat.clicks++;
			document.querySelector('#cat-display .clicks').innerHTML = `Clicked ${currentCat.clicks} times`;
		});
	};

	init();
}());
