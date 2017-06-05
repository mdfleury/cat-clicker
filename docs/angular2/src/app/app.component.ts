import { Component, OnInit } from '@angular/core';
import { CatService } from './cat.service';
import { Cat } from './cat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CatService]
})

export class AppComponent implements OnInit {
  cats: Cat[] = [];
  selectedCat: Cat;

  constructor(
    private catService: CatService,
  ) {}

  ngOnInit(): void {
    this.catService.getCats()
      .then((cats) => {
        this.cats = cats;
        this.selectedCat = cats[0];
      });
  }

  clickCat(): void {
    this.selectedCat.clicks++;
  }
}
