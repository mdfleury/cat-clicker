const CATS = [
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

new Vue({
  el: '#app',
  data: {
    currentCat: CATS[0],
    cats: CATS
  },
  methods: {
    selectCat: function (event) {
      this.currentCat = this.cats[event.target.selectedIndex];
    },
    clickCat: function () {
      this.currentCat.clicks++;
    }
  }
});
