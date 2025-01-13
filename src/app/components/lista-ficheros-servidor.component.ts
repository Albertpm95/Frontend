import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FicheroSubido } from '@interfaces/ficheros-subidos.interface';
import { Store } from '@ngrx/store';
import * as FicheroActions from '@state/ficheros/ficheros.actions';
import { FicheroState } from '@state/ficheros/ficheros.reducer';
@Component({
  selector: 'app-ficheros-servidor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lista-ficheros-subidos">
      <span>Lista de ficheros en el servidor</span>
      <ul>
        @for (fichero of ficherosSubidosServidor; track fichero.id) {
        <li (click)="seleccionarFicheroParaProcesar(fichero)">
          <span>{{ fichero.nombre_fichero }}</span>
          <span>{{ fichero.ruta_fichero }}</span>
          <span>{{ fichero.tipo_fichero }}</span>
        </li>
        }@empty {
        <li>No hay ficheros subidos</li>
        }
      </ul>
    </div>
  `,
})
export class FicherosServidorComponent {
  store = inject(Store<FicheroState>);
  ficherosSubidosServidor: FicheroSubido[] = [];

  ngOnInit() {
    this.store.select('ficheros').subscribe((state) => {
      this.ficherosSubidosServidor = state.listaFicherosServidor;
    });
  }
  ngAfterViewInit() {
    this.refrescarFicherosServidor();
  }
  refrescarFicherosServidor() {
    this.store.dispatch(FicheroActions.refrescarFicheros());
  }
  seleccionarFicheroParaProcesar($event: FicheroSubido) {
    this.store.dispatch(FicheroActions.seleccionarFichero($event));
  }
}
