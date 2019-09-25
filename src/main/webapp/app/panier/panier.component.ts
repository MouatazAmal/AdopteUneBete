import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Animaux, IAnimaux} from 'app/shared/model/animaux.model';
import {PanierService} from "app/panier/panier.service";
import {AnimalStatut} from "app/shared/model/enumerations/animal-statut.model";
import {AnimauxService} from "app/entities/animaux/animaux.service";

@Component({
  selector: 'jhi-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  articles: Animaux[];
  id: number;

  constructor(private route: ActivatedRoute, private router: Router, protected panierService : PanierService, protected animauxService:AnimauxService) {}

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
    this.router.navigate(['../payment']);
  }

  getResult() {
    this.articles= this.panierService.animauxes;
  }

}
