import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FicheroService } from '@services/external/ficheros.service';
import { InputDatosManagerComponent } from '../modules/input-datos-manager.component';
import { InputMatManagerComponent } from '../modules/input-mat-manager.component';

@Component({
  selector: 'app-home',
  imports: [InputMatManagerComponent, InputDatosManagerComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly #ficheroService = inject(FicheroService);
  readonly #cdr = inject(ChangeDetectorRef);
  public imagen: string | undefined;
  public test_size = new FormControl(undefined);
  public train_size = new FormControl(undefined);
  public random_state = new FormControl(undefined);
  public shuffle = new FormControl(undefined);
  public stratify = new FormControl(undefined);
  public intercept = new FormControl(false);
  public method = new FormControl('');
  public enviar() {
    this.imagen = undefined;
    this.#ficheroService
      .ejecutarRegresionLinealMultiplesFicherosConcatenados(
        this.test_size.value ?? undefined,
        this.train_size.value ?? undefined,
        this.random_state.value ?? undefined,
        this.shuffle.value ?? undefined,
        this.stratify.value ?? undefined,
        this.intercept.value ?? undefined,
        this.method.value ?? undefined,
      )
      .subscribe((resultadosEjecucion) => {
        this.imagen = `data:image/png;base64,${resultadosEjecucion.imagen_ploteada}`;
        this.#cdr.detectChanges();
      });
  }
}
