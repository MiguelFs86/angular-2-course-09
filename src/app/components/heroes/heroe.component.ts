import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';

import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

	heroe:Heroe = {
		nombre:"",
		bio:"",
		casa:"Marvel"
	}

	nuevo:boolean = false;
	id:string;

  	constructor(private _heroeService:HeroesService,
  				private router:Router,
  				private route:ActivatedRoute) {
  			this.route.params.
  				subscribe( parametros => {
  					this.id = parametros['id']
  					if (this.id !== "nuevo"){
  						this._heroeService.getHeroe( this.id)
  							.subscribe( heroe => this.heroe = heroe)
  					}
  				});

	}

	  ngOnInit() {
	  }

	guardar(){
		console.log(this.heroe);

		if (this.id == "nuevo"){
  			this.nuevo = true;
			this._heroeService.nuevoHeroe(this.heroe)
				.subscribe( data => {
					this.router.navigate(['/heroe',data.name]);
				},
					error=> console.error(error));
		} else{
			this._heroeService.actualizarHeroe(this.heroe, this.id)
				.subscribe( data => {
					console.log(data);
				},
					error=> console.error(error));
		}
	}

	agregarNuevo( forma: NgForm){
		this.router.navigate(['/heroe','nuevo']);
		forma.reset({
			casa:"Marvel"
		});
	}

}
