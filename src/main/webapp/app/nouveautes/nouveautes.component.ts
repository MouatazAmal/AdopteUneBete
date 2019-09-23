import { Component, OnInit, Input } from '@angular/core';
import { PriceItem } from './price-items';
import {Animaux} from "app/shared/model/animaux.model";
import  {AnimauxService} from "app/entities/animaux/animaux.service";
import {Observable} from "rxjs";
import {AnimalStatut} from "app/shared/model/enumerations/animal-statut.model";

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

  articles: Animaux[];

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
    if(this.Category==='ALL'){
      if(newPriceFilter === 'de 0 a 100 euro'){
        this.animauxService.filtreByPrixAll(0,100).subscribe(data => {this.articles = data; });
      }else if(newPriceFilter === 'de 100 a 500 euro'){
        this.animauxService.filtreByPrixAll(100,500).subscribe(data => {this.articles = data; });
      }else if(newPriceFilter === 'de 500 a 1000 euro'){
        this.animauxService.filtreByPrixAll(500,1000).subscribe(data => {this.articles = data; });
      }else if(newPriceFilter === 'de 1000 a 5000 euro'){
        this.animauxService.filtreByPrixAll(1000,5000).subscribe(data => {this.articles = data; });
      }else if(newPriceFilter === 'de 5000 a 10000 euro'){
        this.animauxService.filtreByPrixAll(5000,10000).subscribe(data => {this.articles = data; });
      }else if(newPriceFilter === 'de 10000 a 50000 euro'){
        this.animauxService.filtreByPrixAll(10000,50000).subscribe(data => {this.articles = data; });
      }else if(newPriceFilter === 'plus de 50000 euro'){
        this.animauxService.filtreByPrixPlusAll(50000).subscribe(data => {this.articles = data; });
      }
    }else {
      if(newPriceFilter === 'de 0 a 100 euro'){
        this.animauxService.filtreByPrix(0,100, this.Category).subscribe(data => {this.articles = data; });
      }else if(newPriceFilter === 'de 100 a 500 euro'){
        this.animauxService.filtreByPrix(100,500, this.Category).subscribe(data => {this.articles = data; });
      }else if(newPriceFilter === 'de 500 a 1000 euro'){
        this.animauxService.filtreByPrix(500,1000, this.Category).subscribe(data => {this.articles = data; });
      }else if(newPriceFilter === 'de 1000 a 5000 euro'){
        this.animauxService.filtreByPrix(1000,5000, this.Category).subscribe(data => {this.articles = data; });
      }else if(newPriceFilter === 'de 5000 a 10000 euro'){
        this.animauxService.filtreByPrix(5000,10000, this.Category).subscribe(data => {this.articles = data; });
      }else if(newPriceFilter === 'de 10000 a 50000 euro'){
        this.animauxService.filtreByPrix(10000,50000, this.Category).subscribe(data => {this.articles = data; });
      }else if(newPriceFilter === 'plus de 50000 euro'){
        this.animauxService.filtreByPrixPlus(50000, this.Category).subscribe(data => {this.articles = data; });
      }
    }
  }

  ChangeSexeFilter(newSexeFilter: string) {
    this.selectedSexeFilter = newSexeFilter;
  }
  ChangeTrieFilter(newTrieFilter: string) {
    this.selectedTrieFilter = newTrieFilter;
  }
  getResult() {
    if(this.Category==="ALL"){
      this.animauxService.getAnimauxUnsoldList().subscribe(data => {this.articles = data; });
    }else{
      this.animauxService.finAnimalUnsoldByType(this.Category).subscribe(data => {this.articles = data; });    }
  }

  SetCategory(cat) {
    /* on input a changer */
    this.Category = cat;
  }

  ngOnInit() {
    this.getResult();
  }
}
