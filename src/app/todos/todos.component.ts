import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  todoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required])
  })
  
  
  constructor(
    private todosService: TodosService,
    private dialog: MatDialog
  ) { }
  
  ngOnInit(): void {
    this.getTodos()
  }

  // Create Todo
  createTodo(): void {
    const todo = {
      title: this.todoForm.get('title')?.value,
      body: this.todoForm.get('body')?.value
    }
    this.todosService.createTodo(todo)
    .subscribe((res: Todo[]) => {
      this.todos = res
      this.todoForm.reset();
    },
    error => {
      console.log(error);
      
    });
  }

  // Get Todos
  getTodos(): void {
    this.todosService.getTodos()
    .subscribe(
      (response: Todo[]) => {
      this.todos = response;
    },
    error => {
      console.log(error);
      
    })
  };

  
  // Edit Todo
  editTodo(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '500px',
      data: {
        todo
      }
    })
    dialogRef.afterClosed()
    .subscribe((result: any) => {
      if(!result) {
        return;
      }
      this.todosService.editTodo(result.todo)
      .subscribe(
        (res: Todo) => {
          console.log('Edit Todo', res);
          
        },
        error => {
          console.log(error);
          
        }
      )
    })
  };
  
  // Delete Todo
  deleteTodo(todo: Todo): void {
    this.todosService.deleteTodo(todo)
    .subscribe((res: string) => {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
      
    }, error => {
      console.log(error);
      
    })
  };

}
