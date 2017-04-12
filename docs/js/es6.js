(function () {
	const cats = [
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

	let currentCat;

	const init = function () {
		currentCat = cats[0];
		let selectHtml = ''; 
		for (cat of cats) {
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
<p>${currentCat.name}</p>
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
