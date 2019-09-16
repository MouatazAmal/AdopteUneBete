import { Component, OnInit } from '@angular/core';
import { ArticleItem } from 'app/article/article-items';

@Component({
  selector: 'jhi-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articles: ArticleItem[] = [
    {
      displayName: 'lion',
      iconName: 'lion_1',
      price: '20 000',
      category: 'felin'
    },
    {
      displayName: 'tigre',
      iconName: 'tigre_1',
      price: '30 000',
      category: 'felin'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
