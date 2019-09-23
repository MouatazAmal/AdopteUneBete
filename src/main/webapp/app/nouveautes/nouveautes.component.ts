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
  }

  ChangeSexeFilter(newSexeFilter: string) {
    this.selectedSexeFilter = newSexeFilter;
  }
  ChangeTrieFilter(newTrieFilter: string) {
    this.selectedTrieFilter = newTrieFilter;
    /*
    if(newTrieFilter === 'de 0 a 100 euro'){
      this.animauxService.filtreByPrix(0,100).subscribe(data => {this.articles = data; });
    }else if(newTrieFilter === 'de 100 a 500 euro'){
      this.animauxService.filtreByPrix(100,500).subscribe(data => {this.articles = data; });
    }else if(newTrieFilter === 'de 500 a 1000 euro'){
      this.animauxService.filtreByPrix(500,1000).subscribe(data => {this.articles = data; });
    }else if(newTrieFilter === 'de 1000 a 5000 euro'){
      this.animauxService.filtreByPrix(1000,5000).subscribe(data => {this.articles = data; });
    }else if(newTrieFilter === 'de 5000 a 10000 euro'){
      this.animauxService.filtreByPrix(5000,10000).subscribe(data => {this.articles = data; });
    }else if(newTrieFilter === 'de 10000 a 50000 euro'){
      this.animauxService.filtreByPrix(10000,50000).subscribe(data => {this.articles = data; });
    }else if(newTrieFilter === 'plus de 50000 euro'){
      this.animauxService.filtreByPrixPlus(50000).subscribe(data => {this.articles = data; });
    }
     */
  }
  getResult() {
    if(this.Category==="Tout les produits"){
      this.animauxService.getAnimauxList().subscribe(data => {this.articles = data; });
    }else if(this.Category==="Les Poissons "){
      this.animauxService.finAnimalByType("POISSON").subscribe(data => {this.articles = data; });
    }else if(this.Category==="Les Felins"){
      this.animauxService.finAnimalByType("FELIN").subscribe(data => {this.articles = data; });
    }else if(this.Category==="Les reptiles "){
      this.animauxService.finAnimalByType("REPTILE").subscribe(data => {this.articles = data; });
    }else if(this.Category==="Les canides "){
      this.animauxService.finAnimalByType("CANIDE").subscribe(data => {this.articles = data; });
    }else if(this.Category==="Autres "){
      this.animauxService.finAnimalByType("AUTRES").subscribe(data => {this.articles = data; });    }
  }

  SetCategory(cat) {
    /* on input a changer */
    this.Category = cat;
  }

  ngOnInit() {
    this.getResult();
  }
}
