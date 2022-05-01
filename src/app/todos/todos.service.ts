import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Create Todo
  createTodo(todo: Todo): Observable<Todo[] | any> {
    return this.http.post(`${this.apiUrl}/todos`, todo)
  } 
  
  // Get All Todos
  getTodos(): Observable<Todo[] | any> {
    return this.http.get(`${this.apiUrl}/todos`);
  }

  // Edit Todo
  editTodo(todo: Todo): Observable<Todo | any> {
    return this.http.patch(`${this.apiUrl}/todos/${todo.id}`, todo);
  }

  // Delete Todo
  deleteTodo(todo: Todo): Observable<string | any> {
    return this.http.delete(`${this.apiUrl}/todos/${todo.id}`, {responseType: 'text'})
  }
}
