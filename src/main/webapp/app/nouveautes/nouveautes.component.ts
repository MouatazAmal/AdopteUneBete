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
  selectedSexeFilter = "";
  selectedPriceFilter ="Filtrer par prix";
  selectedPrice1Filter = "";
  selectedPrice2Filter = "";
  selectedTrieFilter = "";

  articles: Animaux[];

  trieItems: string[] = ['Default', 'Prix croissant', 'Prix decroissant', "Date d'apparition", 'Age'];
  sexeItems: string[] = ['MALE', 'FEMELLE'];
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
    this.selectedPriceFilter=newPriceFilter;
      if(newPriceFilter === 'de 0 a 100 euro'){
        this.selectedPrice1Filter = "0";
        this.selectedPrice2Filter = "100";
      }else if(newPriceFilter === 'de 100 a 500 euro'){
        this.selectedPrice1Filter = "100";
        this.selectedPrice2Filter = "500";
      }else if(newPriceFilter === 'de 500 a 1000 euro'){
        this.selectedPrice1Filter = "500";
        this.selectedPrice2Filter = "1000";
      }else if(newPriceFilter === 'de 1000 a 5000 euro'){
        this.selectedPrice1Filter = "1000";
        this.selectedPrice2Filter = "5000";
      }else if(newPriceFilter === 'de 5000 a 10000 euro'){
        this.selectedPrice1Filter = "5000";
        this.selectedPrice2Filter = "10000";
      }else if(newPriceFilter === 'de 10000 a 50000 euro'){
        this.selectedPrice1Filter = "1000";
        this.selectedPrice2Filter = "50000";
      }else if(newPriceFilter === 'plus de 50000 euro'){
        this.selectedPrice1Filter = "50000";
        this.selectedPrice2Filter = "";
      }else{
        this.selectedPrice1Filter = "";
        this.selectedPrice2Filter = "";
      }
    this.getResult();
  }

  ChangeSexeFilter(newSexeFilter: string) {
    this.selectedSexeFilter = newSexeFilter;
    this.getResult() ;
  }

  ChangeTrieFilter(newTrieFilter: string) {
    this.selectedTrieFilter = newTrieFilter;
    this.getResult();
  }

  getResult() {
    this.filtre(this.Category,this.selectedSexeFilter,this.selectedPrice1Filter,this.selectedPrice2Filter);
  }

  filtre(type:string,sexe:string,prixMin:string,prixMax:string){
    this.animauxService.filtre(sexe,type,prixMin,prixMax).subscribe(data => {this.articles = data; });
  }

  SetCategory(cat) {
    /* on input a changer */
    this.Category = cat;
  }

  ngOnInit() {
    this.getResult();
  }
}
