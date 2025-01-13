import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FicheroState } from './ficheros.reducer';

export const selectFicheroState =
  createFeatureSelector<FicheroState>('ficheros');

export const selectTodosFicheros = createSelector(
  selectFicheroState,
  (state: FicheroState) => state.lista
);
