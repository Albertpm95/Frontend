import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FicheroSubido } from '@interfaces/ficheros-subidos.interface';
import { FicheroService } from '@services/ficheros.service';
import { FicherosStore } from '@state/ficheros/ficheros.store';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-ficheros-servidor',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <span class="text-xl font-semibold"
        >Lista de ficheros en el servidor</span
      >
      @if($ficherosSubidosServidorRxResource.isLoading() ){
      <br /><span>Cargando...</span>
      } @else{
      <ul class="mt-5">
        @for (fichero of $ficherosSubidosServidorRxResource.value(); track
        fichero.id) {
        <li
          (click)="seleccionarFicheroParaProcesar(fichero)"
          class="cursor-pointer bg-gray-100 hover:bg-gray-200 p-4 rounded-lg shadow-sm border border-gray-300 flex flex-col gap-2"
        >
          <span class="text-gray-800">
            <b class="font-bold">Nombre: </b>
            <span class="capitalize">{{ fichero.nombre_fichero }}</span>
          </span>
        </li>
        }@empty {
        <li>No hay ficheros subidos</li>
        }
      </ul>
      }
    </div>
  `,
})
export class FicherosServidorComponent {
  readonly #ficherosService = inject(FicheroService);
  readonly store = inject(FicherosStore);
  ficherosSubidosServidor: FicheroSubido[] = [];

  $ficherosSubidosServidorRxResource = rxResource({
    loader: (): Observable<FicheroSubido[]> =>
      this.#ficherosService.obtenerFicheros(),
  });

  seleccionarFicheroParaProcesar($event: FicheroSubido) {
    this.store.seleccionarFicheroParaProcesar($event);
  }
}
