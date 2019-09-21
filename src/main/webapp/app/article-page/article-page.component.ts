import {Animaux} from "app/shared/model/animaux.model";
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'articlePage',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  @Input() articleItem: Animaux;

  id: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.id = this.activatedRoute.paramMap.subscribe(params => { params.id});
    this.id = +this.route.snapshot.paramMap.get('id');
  }
  addToPanier(){

  }
  /*goToPanier(){
    this.router.navigate(['../panieryyy'], {queryParams : {id: this.articleItem.id}});

  }*/

}
