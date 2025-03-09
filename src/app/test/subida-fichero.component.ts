import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FicheroSubido } from '@interfaces/ficheros-subidos.interface';
import { endpoints, environment } from 'environment';
import { VisorImagenComponent } from './imagen.component';
@Component({
  selector: 'app-subida-fichero',
  imports: [CommonModule, VisorImagenComponent],
  template: `
    <div class="space-y-4">
      <!-- Seleccionar fichero -->
      <div class="flex flex-col space-y-2">
        <label for="file" class="text-sm font-medium text-gray-700">
          Selecciona un fichero:
        </label>
        <input
          id="file"
          type="file"
          class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          (change)="seleccionarFicheroParaSubir($event)"
        />
      </div>

      <!-- Introducir descripción -->
      <div class="flex flex-col space-y-2">
        <label for="descripcion" class="text-sm font-medium text-gray-700">
          Introduzca una descripción:
        </label>
        <textarea
          id="descripcion"
          formControl="descripcionFichero"
          class="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
        ></textarea>
      </div>

      <!-- Botón Subir -->
      <button
        class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
        (click)="subirFichero()"
      >
        Subir
      </button>
      <button
        class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
        (click)="ejecutarLinearRegresion()"
      >
        Ejecutar LR sobre CSV
      </button>
    </div>
    @if(imageData){
    <app-visor-imagen [imageData]="imageData"></app-visor-imagen>}

    <!-- Resultado -->
    <div class="mt-4">
      <span>Resultado: </span>
      <p class="text-sm text-gray-700">{{ resultado }}</p>
    </div>
  `,
  standalone: true,
})
export class SubidaFicherosComponent {
  http = inject(HttpClient);
  fichero: any;
  descripcionFichero = new FormControl('');
  resultado: string = '';
  ficherosSubidosServidor: FicheroSubido[] = [];
  ficherosSeleccionadosServidor: FicheroSubido[] = [];

  imageData = undefined;

  seleccionarFicheroParaSubir(event: any) {
    this.fichero = event.target.files[0];
  }

  subirFichero() {
    if (this.fichero) {
      const formData = new FormData();
      formData.append('file', this.fichero);

      this.http
        .post(`${environment.apiUrl + endpoints.utils.files.upload}`, formData)
        .subscribe((response: any) => {
          console.log('Respuesta:', response);
          if (response.message) this.resultado = response.message;
        });
    }
  }
  ejecutarLinearRegresion() {
    if (this.fichero) {
      const formData = new FormData();
      formData.append('file', this.fichero);
      this.http
        .post(
          `${
            environment.apiUrl +
            endpoints.linear_regresion.uploadYEjecutarLinearRegresion
          }`,
          formData
        )
        .subscribe((response: any) => {
          console.log('Respuesta:', response);
          if (response.message) this.resultado = response.message;
          this.imageData = response.image;
        });
    }
  }
}
