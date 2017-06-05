import { Injectable } from '@angular/core';
import { Cat } from './cat';

const CATS = [
  {
    'clicks': 0,
    'name': 'Adam',
    'url': 'https://mdfleury.github.io/cat-clicker/images/cat1.jpg'
  },
  {
    'clicks': 0,
    'name': 'Bill',
    'url': 'https://mdfleury.github.io/cat-clicker/images/cat2.jpg'
  },
  {
    'clicks': 0,
    'name': 'Chris',
    'url': 'https://mdfleury.github.io/cat-clicker/images/cat3.jpg'
  },
  {
    'clicks': 0,
    'name': 'David',
    'url': 'https://mdfleury.github.io/cat-clicker/images/cat4.jpg'
  },
  {
    'clicks': 0,
    'name': 'Ebert',
    'url': 'https://mdfleury.github.io/cat-clicker/images/cat5.jpg'
  }
];

@Injectable()
export class CatService {
  getCats(): Promise<Cat[]> {
    return Promise.resolve(CATS);
  }
}
