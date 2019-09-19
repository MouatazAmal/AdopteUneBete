import { ArticleItem } from './../article/article-items';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'articlePage',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  @Input() articleItem: ArticleItem;
  id: number;
  private sub: any;
  private state$: Observable<object>;

  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // this.id = this.activatedRoute.paramMap.subscribe(params => { params.id});
    // this.router.events.pipe(filter(e => e instanceof NavigationStart), map(() => this.router.getCurrentNavigation().extras.state));
  }

}
