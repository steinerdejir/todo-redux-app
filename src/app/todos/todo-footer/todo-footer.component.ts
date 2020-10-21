import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filtrosValidos } from 'src/app/filtro/filtro.action';
import { AppState } from '../../app.reducer';
import { setFiltro } from '../../filtro/filtro.action';
import { limpiarTodos } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  filtroActual: filtrosValidos = 'todos';
  filtros: filtrosValidos[] = ['todos' , 'completados', 'pendientes'];
  pendientes = 0;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filtro').subscribe( filtro => this.filtroActual = filtro );
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( todo => !todo.completado ).length;
    });
  }
  // tslint:disable-next-line: typedef
  cambiarFiltro( filtro: filtrosValidos){
    this.store.dispatch( setFiltro({ filtro }) );
  }
  // tslint:disable-next-line: typedef
  limpiarTodos(){
    this.store.dispatch( limpiarTodos());
  }

}
