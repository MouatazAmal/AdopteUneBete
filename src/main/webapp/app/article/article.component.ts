import { Component, OnInit, Input } from '@angular/core';
import { ArticleItem } from 'app/article/article-items';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() articleItem: ArticleItem;

  constructor(private router: Router) {}

  ngOnInit() {}

  goToProductDetails() {
    console.log(this.articleItem);
    //this.stateService.data = this.articleItem; , { state: this.articleItem }
    this.router.navigate(['../articlePage', this.articleItem.id]);
  }
}
