import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { endpoints, environment } from '../../environment';
import { FicheroSubido } from '../interfaces/ficheros-subidos.interface';
@Component({
  selector: 'app-subida-fichero',
  imports: [CommonModule, ButtonModule, TextareaModule],
  template: `
    <div class="header">
      <div class="input-fichero">
        <label for="file">Selecciona un fichero</label>
        <input
          pInputText
          type="file"
          (change)="seleccionarFicheroParaSubir($event)"
        />
      </div>
      <div class="descripcion-fichero">
        <label for="file">Introduzca una descripción</label>
        <textarea
          pTextarea
          id="descripcion-fichero"
          type="textarea"
          formControl="descripcionFichero"
        ></textarea>
      </div>
      <p-button
        pButton
        label="Subir"
        class="p-button p-button-primary"
        (click)="subirFichero()"
      ></p-button>
    </div>
    <div>
      <p>{{ resultado }}</p>
    </div>
  `,
  standalone: true,
  styles: [``],
})
export class SubidaFicherosComponent {
  http = inject(HttpClient);
  fichero: any;
  descripcionFichero = new FormControl('');
  resultado: string = '';
  ficherosSubidosServidor: FicheroSubido[] = [];
  ficherosSeleccionadosServidor: FicheroSubido[] = [];

  seleccionarFicheroParaSubir(event: any) {
    console.log('Subiendo fichero...', event);
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
}
