import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FicheroSubido } from '@interfaces/ficheros-subidos.interface';
import { FicheroService } from '@services/ficheros.service';
import { FicherosStore } from '@state/ficheros/ficheros.store';

@Component({
  selector: 'app-ficheros-servidor-seleccionados',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <span class="text-xl font-semibold"
        >Lista de ficheros en el servidor</span
      >

      <ul>
        @for (fichero of store.listaFicherosServidorSeleccionados(); track
        fichero.id) {
        <li
          (click)="desSeleccionarFicheroParaProcesar(fichero)"
          class="cursor-pointer bg-gray-100 hover:bg-gray-200 p-4 rounded-lg shadow-sm border border-gray-300 flex flex-col gap-2"
        >
          <span class="text-gray-800">
            <b class="font-bold">Nombre: </b>
            <span class="capitalize">{{ fichero.nombre_fichero }}</span>
          </span>
        </li>

        }@empty {
        <li class="p-text-center">No hay ficheros seleccionados</li>
        }
      </ul>

      <button
        label="Enviar lista"
        class="p-button p-button-primary"
        (click)="enviarListaFicherosProcesar()"
      ></button>
    </div>
  `,
  styles: [],
})
export class FicherosServidorSeleccionadosComponent {
  readonly #ficherosService = inject(FicheroService);
  readonly store = inject(FicherosStore);

  resultado: string = '';

  listaFicherosServidorSeleccionados: FicheroSubido[] = [];

  desSeleccionarFicheroParaProcesar($event: FicheroSubido) {
    this.store.desSeleccionarFicheroParaProcesar($event);
  }

  enviarListaFicherosProcesar() {
    this.#ficherosService
      .enviarListaFicherosProcesar(this.listaFicherosServidorSeleccionados)
      .subscribe((response: any) => {
        console.log('Respuesta:', response);
        if (response.message) this.resultado = response.message;
      });
  }
}
