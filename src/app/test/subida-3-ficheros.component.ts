import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { endpoints, environment } from 'environment';
import { VisorImagenComponent } from './imagen.component';
@Component({
  selector: 'app-subida-3-fichero',
  imports: [CommonModule, VisorImagenComponent],
  template: `
    <div class="space-y-4">
      <!-- Seleccionar fichero -->
      <div class="flex flex-col space-y-2">
        <label for="file" class="text-sm font-medium text-gray-700">
          Selecciona un fichero pixels:
        </label>
        <input
          id="file"
          type="file"
          class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          (change)="seleccionarficheroPixelsParaSubir($event)"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="file" class="text-sm font-medium text-gray-700">
          Selecciona un fichero background:
        </label>
        <input
          id="file"
          type="file"
          class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          (change)="seleccionarficheroBackgroundParaSubir($event)"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <label for="file" class="text-sm font-medium text-gray-700">
          Selecciona un wavelength:
        </label>
        <input
          id="file"
          type="file"
          class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          (change)="seleccionarficheroWavelengthParaSubir($event)"
        />
      </div>

      <button
        class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
        (click)="ejecutarLinearRegresion()"
      >
        Ejecutar LR sobre CSV
      </button>
    </div>
    @if(imageData){
    <app-visor-imagen [imageData]="imageData"></app-visor-imagen>}
  `,
  standalone: true,
})
export class Subida3FicherosComponent {
  http = inject(HttpClient);
  fichero_pixels: any;
  fichero_background: any;
  fichero_wavelength: any;

  imageData = undefined;

  seleccionarficheroPixelsParaSubir(event: any) {
    this.fichero_pixels = event.target.files[0];
  }
  seleccionarficheroBackgroundParaSubir(event: any) {
    this.fichero_background = event.target.files[0];
  }
  seleccionarficheroWavelengthParaSubir(event: any) {
    this.fichero_wavelength = event.target.files[0];
  }
  ejecutarLinearRegresion() {
    if (
      this.fichero_pixels &&
      this.fichero_background &&
      this.fichero_wavelength
    ) {
      const formData = new FormData();
      console.log('Fichero pixels:', this.fichero_pixels);
      console.log('Fichero fichero_background:', this.fichero_background);
      console.log('Fichero fichero_wavelength:', this.fichero_wavelength);
      formData.append('fichero_pixels', this.fichero_pixels);
      formData.append('fichero_background', this.fichero_background);
      formData.append('fichero_wavelength', this.fichero_wavelength);
      this.http
        .post(
          `${
            environment.apiUrl +
            endpoints.linear_regresion.upload_pixels_background_wavelength
          }`,
          formData
        )
        .subscribe((response: any) => {
          console.log('Respuesta:', response);

          this.imageData = response.image;
        });
    }
  }
}
