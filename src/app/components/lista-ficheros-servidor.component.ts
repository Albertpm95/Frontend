import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FicheroSubido } from '@interfaces/ficheros-subidos.interface';
import { FicherosStore } from '@state/ficheros/ficheros.store';

import { endpoints, environment } from 'environment';
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
      <span>Cargando...</span>
      } @else{
      <ul>
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
  http = inject(HttpClient);
  readonly store = inject(FicherosStore);
  ficherosSubidosServidor: FicheroSubido[] = [];

  $ficherosSubidosServidorRxResource = rxResource({
    loader: (): Observable<FicheroSubido[]> =>
      this.http.get<FicheroSubido[]>(
        `${environment.apiUrl + endpoints.utils.files.list}`
      ),
  });

  seleccionarFicheroParaProcesar($event: FicheroSubido) {
    this.store.seleccionarFicheroParaProcesar($event);
  }
}
