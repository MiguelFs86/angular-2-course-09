import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

	heroes:Heroe;
	loading:boolean = true;

	constructor(private _heroeService:HeroesService) { 
		this._heroeService.getHeroes()
			.subscribe( data => {
				setTimeout( ()=> {
					this.loading = false;
					this.heroes = data;
				}, 1500);
			})
	}

	ngOnInit() {
	}

	borraHeroe( key$:string ){
		this._heroeService.borrarHeroe(key$)
			.subscribe( respuesta =>{
				if (respuesta){
					console.error(respuesta);
				}else{
					delete this.heroes[key$];
				}
			})
	}

}
