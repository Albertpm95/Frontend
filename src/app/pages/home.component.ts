/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FicheroService } from '@services/external/ficheros.service';
import { UtilsService } from '@services/internal/utils.service';
import { catchError, Observable, throwError } from 'rxjs';
import { InputDatosManagerComponent } from '../modules/input-datos-manager.component';
import { InputMatManagerComponent } from '../modules/input-mat-manager.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    InputMatManagerComponent,
    InputDatosManagerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly #ficheroService = inject(FicheroService);
  readonly #utilsService = inject(UtilsService);
  readonly #cdr = inject(ChangeDetectorRef);
  public imagen: string | undefined;
  public test_size = new FormControl(undefined, {
    validators: [Validators.min(0), Validators.max(0)],
    asyncValidators: [this.validateTestAndTrainSize()],
  });
  public train_size = new FormControl(undefined, {
    validators: [Validators.min(0), Validators.max(0)],
    asyncValidators: this.validateTestAndTrainSize(),
  });
  public random_state = new FormControl(undefined);
  public shuffle = new FormControl(undefined);
  public stratify = new FormControl(undefined);
  public intercept = new FormControl(false);
  public method = new FormControl('');
  public errors: string[] = [];
  public enviar() {
    this.imagen = undefined;
    this.errors = [];
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
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const flattenObject = this.#utilsService.flattenHttpErrorResponse(error);
          Object.entries(flattenObject).forEach((key: any, value: any) => {
            this.errors.push(`${key + ': ' + value}`);
          });
          return throwError(() => error);
        }),
      )
      .subscribe((resultadosEjecucion) => {
        console.log('Respuesta');
        this.imagen = `data:image/png;base64,${resultadosEjecucion.imagen_ploteada}`;
        this.#cdr.detectChanges();
      });
  }

  // ngOnInit() {
  //   this.test_size.setValidators([
  //     Validators.min(0),
  //     Validators.max(1),
  //     this.validateTestAndTrainSize.bind(this),
  //   ]);
  //   this.train_size.setValidators([Validators.min(0), Validators.max(1)]);
  // }

  validateTestAndTrainSize(): AsyncValidatorFn {
    return (
      control: AbstractControl,
    ):
      | Promise<{ [key: string]: any } | null>
      | Observable<{ [key: string]: any } | null> => {
      // Lógica de validación asincrónica aquí
      // Devuelve una promesa o un observable que resuelve a null si es válido, o un objeto de error si no lo es
      return new Promise((resolve) => {
        // Ejemplo de lógica de validación
        const value = control.value;
        if (value < 0 || value > 1) {
          resolve({ invalidSize: true });
        } else {
          resolve(null);
        }
      });
    };
  }
}
