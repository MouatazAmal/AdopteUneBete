import {Animaux, IAnimaux} from "app/shared/model/animaux.model";
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AnimauxService} from "app/entities/animaux/animaux.service";
import {Observable} from "rxjs";
import {Paniers} from "app/shared/model/paniers.model";
import {PanierService} from "app/panier/panier.service";

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'articlePage',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  @Input()

  articleItem: Animaux;

  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private animauxService: AnimauxService, private panierService : PanierService) {}

  ngOnInit() {
    // this.id = this.activatedRoute.paramMap.subscribe(params => { params.id});
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getResult();
  }

  addToPanier(){
    this.panierService.addAnimaux(this.articleItem);
  }

  getResult(){
    this.animauxService.findAnimal(this.id).subscribe(data => {this.articleItem = data; });
  }

  /*goToPanier(){
    this.router.navigate(['../panieryyy'], {queryParams : {id: this.articleItem.id}});

  }*/

}
