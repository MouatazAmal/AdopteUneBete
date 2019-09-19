import { Component, OnInit, Input } from '@angular/core';
import { ArticleItem } from 'app/article/article-items';

@Component({
  selector: 'jhi-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() articleItem: ArticleItem;

  constructor() {}

  ngOnInit() {}
}
