import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { ArticleItem } from 'app/article/article-items';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account;
  authSubscription: Subscription;
  modalRef: NgbModalRef;
  articles: ArticleItem[];

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
    this.getResult();
  }

  getResult() {
    this.articles = [
      {
        displayName: 'lion',
        iconName: '../../content/images/animalsPics/lion.jpg',
        price: '20 000',
        category: 'felin',
        id: 8
      },
      {
        displayName: 'tigre',
        iconName: '../../content/images/animalsPics/Tigre.jpg',
        price: '30 000',
        category: 'felin',
        id: 9
      },
      {
        displayName: 'lion',
        iconName: '../../content/images/animalsPics/lion.jpg',
        price: '20 000',
        category: 'felin',
        id: 10
      },
      {
        displayName: 'tigre',
        iconName: '../../content/images/animalsPics/Tigre.jpg',
        price: '30 000',
        category: 'felin',
        id: 11
      }
    ];
  }

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.eventManager.destroy(this.authSubscription);
    }
  }
}
