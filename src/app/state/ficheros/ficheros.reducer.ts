import { createReducer, on } from '@ngrx/store';

import { FicheroSubido } from '@interfaces/ficheros-subidos.interface';
import * as FicheroActions from './ficheros.actions';

export interface FicheroState {
  listaFicherosServidor: FicheroSubido[];
  listaFicherosServidorSeleccionados: FicheroSubido[];
}

export const initialState: FicheroState = {
  listaFicherosServidor: [],
  listaFicherosServidorSeleccionados: [],
};

export const ficheroReducer = createReducer(
  initialState,
  on(FicheroActions.subirFichero, (state, { ficheroNuevo }) => ({
    ...state,
    listaFicherosServidor: [...state.listaFicherosServidor, ficheroNuevo], // Actualiza la lista de ficheros del servidor
  })),
  on(FicheroActions.eliminarFichero, (state, { id }) => ({
    ...state,
    listaFicherosServidor: state.listaFicherosServidor.filter(
      (f) => f.id !== id
    ), // Elimina el fichero por ID
  })),
  on(FicheroActions.seleccionarFichero, (state, { id }) => {
    const ficheroSeleccionado = state.listaFicherosServidor.find(
      (f) => f.id === id
    );

    if (ficheroSeleccionado) {
      // Verificar si ya está en la lista de seleccionados
      const isAlreadySelected = state.listaFicherosServidorSeleccionados.some(
        (f) => f.id === ficheroSeleccionado.id
      );

      // Solo agregar si no está seleccionado
      if (!isAlreadySelected) {
        return {
          ...state,
          listaFicherosServidorSeleccionados: [
            ...state.listaFicherosServidorSeleccionados,
            ficheroSeleccionado,
          ],
        };
      }
    }

    return state; // Si ya está seleccionado o no se encuentra, devolvemos el estado sin cambios
  }),
  on(FicheroActions.desSeleccionarFichero, (state, { id }) => ({
    ...state,
    listaFicherosServidorSeleccionados:
      state.listaFicherosServidorSeleccionados.filter((f) => f.id !== id), // Elimina de la lista de seleccionados
  })),
  on(FicheroActions.limpiarListaFicheros, (state) => ({
    ...state,
    listaFicherosServidorSeleccionados: [], // Limpia la lista de seleccionados
  })),
  on(FicheroActions.refrescarFicheros, (state) => state),
  on(FicheroActions.cargarFicherosServidor, (state, { ficherosServidor }) => ({
    ...state,
    listaFicherosServidor: ficherosServidor,
  }))
);
