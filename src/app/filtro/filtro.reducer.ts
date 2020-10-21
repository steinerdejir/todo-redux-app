import { createReducer, on } from '@ngrx/store';
import { filtrosValidos, setFiltro } from './filtro.action';


export const initialState: filtrosValidos = 'todos';

// tslint:disable-next-line: variable-name
const _filtroReducer = createReducer(initialState,
  on( setFiltro, (state, { filtro }) => filtro),
);


// tslint:disable-next-line: typedef
export function filtroReducer(state, action) {
  return _filtroReducer(state, action);
}
