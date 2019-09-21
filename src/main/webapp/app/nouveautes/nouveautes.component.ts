import { Component, OnInit, Input } from '@angular/core';
import { PriceItem } from './price-items';
import {Animaux} from "app/shared/model/animaux.model";
import  {AnimauxService} from "app/entities/animaux/animaux.service";
import {Observable} from "rxjs";

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

  articles: Observable<Animaux[]>;

  trieItems: string[] = ['Default', 'Prix croissant', 'Prix decroissant', "Date d'apparition", 'Age'];
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

  constructor(private animauxService: AnimauxService) {}

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
   this.articles = this.animauxService.getAnimauxList();
  }

  SetCategory(cat) {
    /* on input a changer */
    this.Category = cat;
  }

  ngOnInit() {
    this.getResult();
  }
}
