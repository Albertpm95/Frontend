// effects/ficheros.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FicheroService } from 'app/services/ficheros.service';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as FicheroActions from './ficheros.actions';

@Injectable()
export class FicheroEffects {
  private readonly actions$ = inject(Actions);
  constructor(private readonly ficheroService: FicheroService) {}

  refrescarFicheros$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FicheroActions.refrescarFicheros),
      mergeMap(() =>
        this.ficheroService.obtenerFicheros().pipe(
          map((ficheros) =>
            FicheroActions.cargarFicherosServidor({
              ficherosServidor: ficheros,
            })
          ),
          catchError(() => EMPTY) // Manejo de error (en este caso, no hace nada)
        )
      )
    )
  );
}
