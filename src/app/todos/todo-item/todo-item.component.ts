import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { toggle, editar, borrar } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('inputFisico') txtInputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;

  editando = false;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {

    this.chkCompletado = new FormControl( this.todo.completado);
    this.txtInput = new FormControl( this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch( toggle( { id: this.todo.id }) );
    });
  }
  // tslint:disable-next-line: typedef
  editar(){
    this.editando = true;
    this.txtInput.setValue( this.todo.texto );
    setTimeout( () => {
      this.txtInputFisico.nativeElement.select();
    }, 1);

  }
  // tslint:disable-next-line: typedef
  terminarEdicion(){
    this.editando = false;

    if ( this.txtInput.invalid ) { return; }

    if ( this.txtInput.value === this.todo.texto ) { return; }

    this.store.dispatch(editar({ id: this.todo.id, texto: this.txtInput.value }));

  }
  // tslint:disable-next-line: typedef
  borrar(){
    this.store.dispatch( borrar({ id: this.todo.id }));
  }
}
