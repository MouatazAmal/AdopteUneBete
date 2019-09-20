import { Component, OnInit , Input } from '@angular/core';
import { PriceItem } from './price-items';
import { ArticleItem } from 'app/article/article-items';

@Component({
  selector: 'jhi-nouveautes',
  templateUrl: './nouveautes.component.html',
  styleUrls: ['./nouveautes.component.scss']
})
export class NouveautesComponent implements OnInit {
  @Input() Category: string;
  selectedSexeFilter = 'Sexe ';
  selectedPriceFilter = 'Price ';
  selectedTrieFilter = 'Default ';

  articles: ArticleItem[];
  trieItems: string[] = ['Default', 'Prix croissant', 'Prix decroissant', 'Date d\'apparition', 'Age'];
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

  constructor() {}

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
        displayName: 'lion zbshvzhvs',
        iconName: '../../content/images/animalsPics/lion.jpg',
        price: '20 000',
        category: 'felin',
        id: 1
      },
      {
        displayName: 'tigre',
        iconName: '../../content/images/animalsPics/Tigre.jpg',
        price: '30 000',
        category: 'felin',
        id: 2
      },
      {
        displayName: 'lion2',
        iconName: '../../content/images/animalsPics/lion.jpg',
        price: '20 000',
        category: 'felin',
        id: 3
      },
      {
        displayName: 'lion3',
        iconName: '../../content/images/animalsPics/lion.jpg',
        price: '20 000',
        category: 'felin',
        id: 4
      },
      {
        displayName: 'lion4',
        iconName: '../../content/images/animalsPics/lion.jpg',
        price: '20 000',
        category: 'felin',
        id: 5
      },
      {
        displayName: 'tigre2',
        iconName: '../../content/images/animalsPics/Tigre.jpg',
        price: '30 000',
        category: 'felin',
        id: 6
      },
      {
        displayName: 'tigre3',
        iconName: '../../content/images/animalsPics/Tigre.jpg',
        price: '30 000',
        category: 'felin',
        id: 7
      }
    ];
  }

  SetCategory(cat) {
    /* on input a changer */
    this.Category = cat;
  }

  ngOnInit() {
    this.getResult();
  }
}
