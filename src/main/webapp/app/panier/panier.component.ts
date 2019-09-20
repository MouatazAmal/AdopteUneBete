import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ArticleItem } from 'app/article/article-items';

@Component({
  selector: 'jhi-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  articles: ArticleItem[];
  id: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = +(this.route.snapshot.queryParamMap.get('id'));
    this.getResult();
  }

  removeProduct(id){
    //remove;
    //update
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
      }
    ];
  }

}
