import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FicheroSubido } from '@interfaces/ficheros-subidos.interface';
import { FicherosStore } from '@state/ficheros/ficheros.store';

import { endpoints, environment } from 'environment';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ficheros-servidor-seleccionados',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="lista-ficheros-seleccionados">
      <span class="text-xl font-semibold"
        >Lista de ficheros en el servidor</span
      >
      <ul></ul>
      <ul class="p-list">
        @for (fichero of store.listaFicherosServidorSeleccionados(); track
        fichero.id) {
        <li
          class="p-list-item p-shadow-1 p-mb-2 p-p-3 p-d-flex p-jc-between p-ai-center p-hover-shadow"
          (click)="desSeleccionarFicheroParaProcesar(fichero)"
        >
          <div
            class="p-d-flex p-flex-column p-md-flex-row p-jc-between p-ai-center w-100"
          >
            <div class="p-text-bold p-mb-2 p-md-mb-0 p-text-ellipsis">
              <label>Nombre: </label>{{ fichero.nombre_fichero }}
            </div>
            <div class="p-mb-2 p-md-mb-0 p-text-secondary">
              <label>Ruta: </label>{{ fichero.ruta_fichero }}
            </div>
            <div class="p-tag p-tag-rounded p-mr-2">
              <label>Extensión: </label>{{ fichero.tipo_fichero }}
            </div>
          </div>
        </li>

        }@empty {
        <li class="p-text-center">No hay ficheros seleccionados</li>
        }
      </ul>
      <p-button
        pButton
        label="Enviar lista"
        class="p-button p-button-primary"
        (click)="enviarListaFicherosProcesar()"
      >
      </p-button>
    </div>
  `,
  styles: [],
})
export class FicherosServidorSeleccionadosComponent {
  http = inject(HttpClient);
  store = inject(FicherosStore);
  resultado: string = '';

  listaFicherosServidorSeleccionados: FicheroSubido[] = [];

  desSeleccionarFicheroParaProcesar($event: FicheroSubido) {
    this.store.desSeleccionarFicheroParaProcesar($event);
  }

  enviarListaFicherosProcesar() {
    this.http
      .post(
        `${environment.apiUrl + endpoints.utils.files.selectFilesProcesDB}`,
        this.listaFicherosServidorSeleccionados
      )
      .subscribe((response: any) => {
        console.log('Respuesta:', response);
        if (response.message) this.resultado = response.message;
      });
  }
}
