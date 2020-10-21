import { createAction, props } from '@ngrx/store';
import { FileDetector } from 'protractor';
export type filtrosValidos = 'todos' | 'completados' | 'pendientes' ;

export const setFiltro = createAction(
  '[Filtro] Set Filtro',
  props<{ filtro: filtrosValidos }>()
);
