import { Component, OnInit } from '@angular/core';
import {PriceItem} from './price-items';
import { ArticleItem } from 'app/article/article-items';

@Component({
  selector: 'jhi-nouveautes',
  templateUrl: './nouveautes.component.html',
  styleUrls: ['./nouveautes.component.scss']
})
export class NouveautesComponent implements OnInit {
  Category = 'Nouveautes';
  selectedSexeFilter = 'Sexe ';
  selectedPriceFilter = 'Price ';
  selectedTrieFilter = 'Default ';

  articles: ArticleItem[];
  trieItems: string[] = ['Default', 'Prix croissant', 'Pric decroissant', 'Date dapparution', 'Age'];
  sexeItems: string[] = ['Male', 'Female'];
  priceItems: PriceItem[] = [{
      displayName: 'de 0 a 100 euro'
  },
  {
    displayName: 'de 100 a 500 euro'
  },
  {
    displayName: 'de 500 a 1000 euro'
  },
  {
    displayName: 'de 1000 a 5000 euro'
  },
  {
    displayName: 'de 5000 a 10000 euro'
  },
  {
    displayName: 'de 10000 a 50000 euro'
  },
  {
    displayName: 'plus de 50000 euro'
  }
];

ChangePriceFilter(newPriceFilter: string) {
  this.selectedPriceFilter = newPriceFilter;
}

ChangeSexeFilter(newSexeFilter: string) {
  this.selectedSexeFilter = newSexeFilter;
}
ChangeTrieFilter(newTrieFilter: string) {
  this.selectedTrieFilter = newTrieFilter;
}
getResult() {
  this.articles = [
    {
      displayName: 'lion',
      iconName: '../../content/images/animalsPics/lion.jpg',
      price: '20 000',
      category: 'felin'
    },
    {
      displayName: 'tigre',
      iconName: '../../content/images/animalsPics/Tigre.jpg',
      price: '30 000',
      category: 'felin'
    },
    {
      displayName: 'lion',
      iconName: '../../content/images/animalsPics/lion.jpg',
      price: '20 000',
      category: 'felin'
    }
  ];
}

SetCategory(cat) { /*on input a changer */
  this.Category = cat;
}
  constructor() {}

  ngOnInit() {
    this.getResult();
  }
}
/************
 * <mat-drawer-container class="example-container">
    <mat-drawer mode="side" opened >
        <h5 class="display-6">Trier par : </h5>
        <div class="row">
            <span ngbDropdown class="dropdown-menu-self">
                <a ngbDropdownToggle href="javascript:void(0);" class="dropdown-menu-self">
                    <span>{{selectedTrieFilter}} </span>
                </a>
                <ul class="dropdown-menu" ngbDropdownMenu aria-labelledby="cat-menu">
                    <li *ngFor="let item of trieItems" (click)='ChangeTrieFilter(item)'>
                        <a class="dropdown-item">
                            <span>{{item}}</span>
                        </a>
                    </li>
                </ul>
            </span>
        </div>
        <h5 class="display-6">Affiner par : </h5>
        <div class="row">
        <span ngbDropdown class="dropdown-menu-self">
            <a ngbDropdownToggle href="javascript:void(0);" class="dropdown-menu-self">
                <span>{{selectedPriceFilter}} </span>
            </a>
            <ul class="dropdown-menu" ngbDropdownMenu aria-labelledby="cat-menu">
                <li *ngFor="let item of priceItems" (click)='ChangePriceFilter(item.displayName)'>
                    <a class="dropdown-item">
                        <span>{{item.displayName}}</span>
                    </a>
                </li>
            </ul>
        </span>
        </div>
        <div class="row">
        <span ngbDropdown class="dropdown-menu-self">
            <a ngbDropdownToggle href="javascript:void(0);" class="dropdown-menu-self">
                <span>{{selectedSexeFilter}} </span>
            </a>
            <ul class="dropdown-menu" ngbDropdownMenu aria-labelledby="cat-menu">
                <li *ngFor="let sexe of sexeItems" (click)='ChangeSexeFilter(sexe)'>
                    <a class="dropdown-item">
                        <span> {{sexe}} </span>
                    </a>
                </li>
            </ul>
        </span>
        </div>
    </mat-drawer>
    <mat-drawer-content>
        <div class="row">
            <div class="col-md-4" *ngFor="let art of articles">
                <jhi-article [articleItem]="art"></jhi-article>    
            </div>
        </div>
    </mat-drawer-content>
  </mat-drawer-container>
 */