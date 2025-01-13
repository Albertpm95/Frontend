import { FicheroSubido } from '@interfaces/ficheros-subidos.interface';
import { createAction, props } from '@ngrx/store';

export const subirFichero = createAction(
  '[Fichero] Subir Fichero',
  props<{ ficheroNuevo: FicheroSubido }>()
);

export const cargarFicherosServidor = createAction(
  '[Fichero] Cargar Fichero',
  props<{ ficherosServidor: FicheroSubido[] }>()
);

export const seleccionarFichero = createAction(
  '[Fichero] Seleccionar Fichero',
  props<{ id: number }>()
);

export const desSeleccionarFichero = createAction(
  '[Fichero] Deseleccionar Fichero',
  props<{ id: number }>()
);

export const limpiarListaFicheros = createAction(
  '[Fichero] Limpiar Lista Ficheros Seleccionados'
);

export const eliminarFichero = createAction(
  '[Fichero] Eliminar Fichero',
  props<{ id: number }>()
);

export const refrescarFicheros = createAction(
  '[Fichero] Refrescar Ficheros Desde el Servidor'
);
