import { Injectable } from '@angular/core';
import { Cat } from './cat';

const CATS = [
  {
    'clicks': 0,
    'name': 'Fergie',
    'url': 'http://cdn.playbuzz.com/cdn/0079c830-3406-4c05-a5c1-bc43e8f01479/7dd84d70-768b-492b-88f7-a6c70f2db2e9.jpg'
  },
  {
    'clicks': 0,
    'name': 'Felix',
    'url': 'http://media1.santabanta.com/full1/Animals/Cats/cats-93a.jpg'
  },
  {
    'clicks': 0,
    'name': 'Garfield',
    'url': 'http://cdn.revistadonna.clicrbs.com.br/wp-content/uploads/sites/9/2014/07/Smiling_Cat.jpg'
  },
  {
    'clicks': 0,
    'name': 'Tom',
    'url': 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0'
  },
  {
    'clicks': 0,
    'name': 'Murphy',
    'url': 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0'
  }
];

@Injectable()
export class CatService {
  getCats(): Promise<Cat[]> {
    return Promise.resolve(CATS);
  }
}
