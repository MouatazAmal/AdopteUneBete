import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private router: Router) { }

  retourPanier(){
    //this.router.navigate(['../home']);
    window.history.back();
  }

  ngOnInit() {
  }
  goFinishPayement() {
    // console.log(this.articleItem);
    // this.stateService.data = this.articleItem; , { state: this.articleItem }
    this.router.navigate(['../finishPayment']);
  }

}
