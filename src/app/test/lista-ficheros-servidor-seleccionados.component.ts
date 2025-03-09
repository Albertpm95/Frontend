import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FicheroSubido } from '@interfaces/ficheros-subidos.interface';
import { FicheroService } from '@services/external/ficheros.service';
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

      <ul class="mt-5">
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
        class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none mt-5"
        (click)="enviarListaFicherosProcesar()"
      >
        Enviar lista de ficheros a procesar
      </button>
    </div>
  `,
})
export class FicherosServidorSeleccionadosComponent {
  readonly #ficherosService = inject(FicheroService);
  readonly store = inject(FicherosStore);

  resultado: string = '';

  desSeleccionarFicheroParaProcesar($event: FicheroSubido) {
    this.store.desSeleccionarFicheroParaProcesar($event);
  }

  enviarListaFicherosProcesar() {
    const listaFicherosServidorSeleccionados =
      this.store.listaFicherosServidorSeleccionados();
    if (listaFicherosServidorSeleccionados.length === 2)
      this.#ficherosService
        .enviarListaFicherosProcesar(listaFicherosServidorSeleccionados)
        .subscribe((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              console.log(
                'Uploaded ' + event.loaded + ' out of ' + event.total + ' bytes'
              );
              break;
            case HttpEventType.Response:
              console.log('Finished uploading!');
              break;
          }

          console.log('Respuesta:', event);
          if (event.message) this.resultado = event.message;
        });
  }
}
