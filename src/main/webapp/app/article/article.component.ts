import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {Animaux} from "app/shared/model/animaux.model";

@Component({
  selector: 'jhi-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() articleItem: Animaux;

  constructor(private router: Router) {}

  ngOnInit() {}

  goToProductDetails() {
    // console.log(this.articleItem);
    // this.stateService.data = this.articleItem; , { state: this.articleItem }
    this.router.navigate(['../articlePage', this.articleItem.id]);
  }
}
