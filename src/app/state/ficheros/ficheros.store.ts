import { computed, effect, inject } from '@angular/core';
import { FicheroSubido } from '@interfaces/ficheros-subidos.interface';
import { tapResponse } from '@ngrx/operators';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { FicheroService } from '@services/external/ficheros.service';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
type FicheroState = {
  listaFicherosServidor: FicheroSubido[];
  listaFicherosServidorSeleccionados: FicheroSubido[];
  isLoading: boolean;
};

const initialState: FicheroState = {
  listaFicherosServidor: [],
  listaFicherosServidorSeleccionados: [],
  isLoading: false,
};

export const FicherosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ listaFicherosServidor }) => ({
    totalFicheros: computed(() => listaFicherosServidor().length),
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        // 👇 The effect is re-executed on state change.
        const state = getState(store);
        console.log('counter state', state);
      });
    },
  }),
  withMethods((store, ficherosService = inject(FicheroService)) => ({
    recuperarListadoLibros: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return ficherosService.obtenerFicheros().pipe(
            tapResponse({
              next: (ficheros: FicheroSubido[]) =>
                patchState(store, { listaFicherosServidor: ficheros }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
    seleccionarFicheroParaProcesar(fichero: FicheroSubido) {
      if (!store.listaFicherosServidorSeleccionados().includes(fichero)) {
        patchState(store, (state) => ({
          listaFicherosServidorSeleccionados: [
            ...state.listaFicherosServidorSeleccionados,
            fichero,
          ],
        }));
      }
    },
    desSeleccionarFicheroParaProcesar(fichero: FicheroSubido) {
      patchState(store, (state) => ({
        listaFicherosServidorSeleccionados:
          state.listaFicherosServidorSeleccionados.filter((f) => f !== fichero),
      }));
    },
    recuperarListaFicherosParaProcesar() {
      return store.listaFicherosServidorSeleccionados();
    },
  }))
);
