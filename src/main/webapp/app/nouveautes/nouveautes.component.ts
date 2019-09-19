import { Component, OnInit } from '@angular/core';
import { PriceItem } from './price-items';
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
  priceItems: PriceItem[] = [
    {
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

  SetCategory(cat) {
    /*on input a changer */
    this.Category = cat;
  }
  constructor() {}

  ngOnInit() {
    this.getResult();
  }
}
