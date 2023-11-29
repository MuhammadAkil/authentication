import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private objectStoreName = 'Todos';
  loginStatus = false
  currentUserId: any;
  currentUserName: any
  userName: any
  constructor(private dbService: NgxIndexedDBService, private router: Router) {
  }


  registerUser(email: string, password: string, name: string) {
    this.dbService.add('users', { email, password, name }).subscribe({
      next: (addedUser: any) => {
        if (addedUser && addedUser['name']) {
          const userName = addedUser['name'];
          console.log(`User name: ${userName}`);
        } else {
          console.error('User registration successful, but unable to retrieve user name.');
        }
      }
      ,
      error: (error: any) => {
        console.error('Error during user registration:', error);
      }
    });
  }

  setLoginStatus(v: boolean) {
    this.loginStatus = v;
  }

  isLogin() {
    return this.loginStatus;
  }

  logout() {
    this.dbService.clear(this.objectStoreName);
    this.router.navigate(['']);
  }

  getCurrentUserId(): number | null {
    return this.currentUserId;
  }

  setCurrentUserId(userId: number): void {
    this.currentUserId = userId;
  }
  getCurrentUserName() {
    return this.currentUserName;
  }

  setCurrentUserName(userName: any) {
    this.currentUserName = userName;
    console.log(this.currentUserName)
  }

  loginUsesr(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      this.dbService.getByIndex(this.objectStoreName, 'email', email).subscribe({
        next: (res: any) => {
          if (res.email === email && res.password === password) {
            console.log('User login successful');
            this.router.navigate(['profile']);
          } else {
            console.log('Invalid email or password');
          }
        },
        error: () => {
          console.log('Invalid email or password');
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  getUserName() {
    return this.userName;
  }


  loginUser(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      this.dbService.getByIndex('users', 'email', email).subscribe({
        next: (res: any) => {
          if (res && res.email === email && res.password === password) {
            this.setCurrentUserName(res.name);
            let a = this.setCurrentUserId(res.id);
            console.log(a)
            observer.next(true);
            observer.complete();
          } else {
            observer.next(false);
            observer.complete();
          }
        },
        error: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }


  addTodo(todo: string) {
    const currentUserId = this.getCurrentUserId();
    if (currentUserId !== null) {
      const newTodo = { todo: todo, userId: currentUserId };
      this.dbService.add(this.objectStoreName, newTodo).subscribe(() => {
        console.log('Added todo');
      });
    }
  }


  getTodoListByUser(userId: number): Observable<any[]> {
    return new Observable((observer) => {
      this.dbService.getAll('Todos').subscribe((todos: any[]) => {
        const filteredTodos = todos.filter((todo) => todo.userId === userId);
        console.log(filteredTodos)
        observer.next(filteredTodos);
        observer.complete();
      });
    });
  }



  getTodoList(): Observable<any[]> {
    return this.dbService.getAll(this.objectStoreName);

  }

  getTodosByUserId(userId: number): Observable<any[]> {
    return this.dbService.getByIndex(this.objectStoreName, 'userId', userId);
  }




  deleteTodo(id: number): Observable<void> {
    return new Observable<void>((observer) => {
      const currentUserId = this.getCurrentUserId();
      if (currentUserId !== null) {
        this.dbService.delete(this.objectStoreName, id).subscribe(() => {
          observer.next();
          observer.complete();
        });
      }
    });
  }

  updateTodo(id: number, updatedText: string) {
    return new Observable<void>((observer) => {
      const currentUserId = this.getCurrentUserId();
      if (currentUserId !== null) {
        const updatedTodo = { id: id, todo: updatedText };
        this.dbService.update(this.objectStoreName, updatedTodo).subscribe(() => {
          observer.next();
          observer.complete();
        });
      }
    });
  }


  deleteDatabase() {
    return new Promise<void>((resolve, reject) => {
      this.dbService.clear(this.objectStoreName).subscribe(() => {
        const databaseName = 'TodoList';
        indexedDB.deleteDatabase(databaseName).onsuccess = () => {
          console.log('Database deleted successfully.');
          resolve();
        };

        indexedDB.deleteDatabase(databaseName).onerror = (event) => {
          console.error('Error deleting database:', (event.target as IDBOpenDBRequest).error);
          reject('Error deleting database');
        };
      });
    });
  }
}
