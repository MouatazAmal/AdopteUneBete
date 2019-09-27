import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Animaux, IAnimaux} from 'app/shared/model/animaux.model';
import {PanierService} from "app/panier/panier.service";
import {AnimalStatut} from "app/shared/model/enumerations/animal-statut.model";
import {AnimauxService} from "app/entities/animaux/animaux.service";
import {LoginModalService} from "app/core/login/login-modal.service";
import {AccountService} from "app/core/auth/account.service";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {LoginService} from "app/core/login/login.service";

@Component({
  selector: 'jhi-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  articles: Animaux[];
  id: number;
  totalPrice = 0;
  modalRef: NgbModalRef;

  constructor( private loginService: LoginService, private accountService: AccountService, private loginModalService: LoginModalService, private route: ActivatedRoute, private router: Router, protected panierService : PanierService, protected animauxService:AnimauxService) {}

  ngOnInit() {
    this.id = +(this.route.snapshot.queryParamMap.get('id'));
    this.getResult();
  }

  removeProduct(animal:Animaux){
    // eslint-disable-next-line no-console
    console.log(animal.statut);
    animal.statut=AnimalStatut.DISPONIBLE;
    const newAnimal = this.animauxService.createFromAnimalForm(animal);
    this.animauxService.update(newAnimal).subscribe(
      () => {
        // eslint-disable-next-line no-console
        console.log('Enregistrement terminé !');
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log('Erreur ! : ' + error);
      }
    );

    this.panierService.supAnimaux(animal.id);
    // eslint-disable-next-line no-console
    console.log(newAnimal);
    this.getResult();
  }

  toOrder(){
    if(this.isAuthenticated()){
      this.router.navigate(['../payment']);
    }else{
      this.login();
    }
  }

  getResult() {
    this.articles= this.panierService.animauxes;
    this.setTotalPrice();
  }

  setTotalPrice(){
    this.totalPrice = 0;
    for(let i=0; i<this.articles.length; i++){
      this.totalPrice += this.articles[i].prix;
    }

  }


  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  goToProductDetailsFrom(animalId) {
    // console.log(this.articleItem);
    // this.stateService.data = this.articleItem; , { state: this.articleItem }
    this.router.navigate(['../articlePage', animalId]);
  }

}
