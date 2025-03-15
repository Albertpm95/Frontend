import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
    @if (imagen) {
      <div class="flex flex-row border-2">
        <img class="border-3" [src]="[imagen]" fill placeholder />
      </div>
    }
  </div>`,
})
export class HomeComponent {
  readonly #ficheroService = inject(FicheroService);
  readonly #cdr = inject(ChangeDetectorRef);
  public imagen: string | undefined;
  public enviar() {
    this.#ficheroService
      .ejecutarRegresionLinealMultiplesFicherosConcatenados()
      .subscribe((resultadosEjecucion) => {
        console.log(resultadosEjecucion);
        this.imagen = `data:image/png;base64,${resultadosEjecucion.imagen_ploteada}`;
        this.#cdr.detectChanges();
      });
  }
}
