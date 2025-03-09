import { Component } from '@angular/core';
import { Fichero } from '@interfaces/ficheros.interface';

@Component({
  selector: 'app-home',
  imports: [],
  styles: [``],
  template: ``,
})
export class HomeComponent {
  ficheros: { id: number; fichero: Fichero | undefined }[] = [
    { id: 0, fichero: undefined },
  ];

  public enviar() {
    console.log('Ficheros seleccionados ', this.ficheros);
  }
}
