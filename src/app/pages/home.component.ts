import { Component, inject } from '@angular/core';
import { RespuestaRegresionConcatenadaPlot } from '@interfaces/datos-directos.interface';
import { InputDatosManagerComponent } from '@modules/input-datos-manager.component';
import { FicheroService } from '@services/external/ficheros.service';

@Component({
  selector: 'app-home',
  imports: [InputDatosManagerComponent],

  template: `<div class="flex flex-col gap-4">
    <app-input-datos-manager [tipo]="'INDEPENDIENTE'"></app-input-datos-manager>
    <!-- <app-input-datos-manager [tipo]="'DEPENDIENTE'"></app-input-datos-manager> -->
    <app-input-datos-manager [tipo]="'PLOT'"></app-input-datos-manager>
    <button (click)="enviar()">Enviar</button>
    <img [src]="imagen" />
  </div>`,
})
export class HomeComponent {
  readonly #ficheroService = inject(FicheroService);
  public imagen: string | undefined = undefined;
  public enviar() {
    this.#ficheroService
      .ejecutarRegresionLinealMultiplesFicherosConcatenados()
      .subscribe((resultadosEjecucion: RespuestaRegresionConcatenadaPlot) => {
        this.imagen = resultadosEjecucion.imagen_ploteada;
      });
  }
}
