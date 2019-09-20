import { ArticleItem } from './../article/article-items';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'articlePage',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  @Input() articleItem: ArticleItem = {
    displayName: 'lion zbshvzhvs',
    iconName: '../../content/images/animalsPics/lion.jpg',
    iconNameSec: '../../content/images/animalsPics/lion2.jpg',
    price: '20 000',
    category: 'felin',
    id: 1,
    sexe: 'female',
    age: 2,
    weigth: 2
  };
  id: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.id = this.activatedRoute.paramMap.subscribe(params => { params.id});
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  goToPanier() {
    this.router.navigate(['../panieryyy'], { queryParams: { id: this.articleItem.id } });
  }
}
