import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador/marcador.component';
import {MatSnackBar, MatDialog} from '@angular/material';
import { config } from 'rxjs';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  marcadores: Marcador[] = [];
  lat = 51.678418;
  lng = 7.809007;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }

  }

  ngOnInit() {}

  agregarMarcador(evento) {
    const coords: {lat: number, lng: number} = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this.snackBar.open('Marcador agregado correctamente.', 'Cerrar', {duration : 3000 });
  }

  borrarMarcador( index: number ) {
    this.marcadores.splice(index, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador eliminado correctamente.', 'Cerrar' , {duration: 3000});
  }

  editarMarcador( marcador) {
      // this.dialog.open();
      const dialogRef = this.dialog.open(MapaEditarComponent, {
        width: '250px',
        data: {titulo: marcador.titulo, descripcion: marcador.desc}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        if (!result) {
          return;
        }

        marcador.titulo = result.titulo;
        marcador.desc = result.desc;
        console.log('marcador', marcador.desc);
        this.guardarStorage();
        this.snackBar.open('Marcador Actualizado.', 'Cerrar', {duration : 3000 });
      });
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }
}
