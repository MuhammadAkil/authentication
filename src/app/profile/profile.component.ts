import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../auth/todo.service';
import Swal from 'sweetalert2';
import { Editor } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editor: Editor = new Editor();
  currentDate: Date = new Date();
  userData: any;

  todo: any;
  editMode: boolean = false;
  updatedText: string = '';
  search: string = '';
  todoList: any[] = [];
  filteredItems: any[] = [];


  constructor(private route: ActivatedRoute, private auth: AuthService, private fb: FormBuilder, private todoService: TodoService, private toastr: ToastrService) {
    this.auth.profile()

  }

  ngOnInit(): void {

    this.getTodoListByUser();
  }



  // getTodo() {
  //   return this.todoService.getTodo()
  // }
  showSuccess: boolean = false;
  showError: boolean = false;
  confirmError: boolean = false
  showSuccessAlert() {
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, 3000);
  }
  confirmAlert() {
    this.confirmError = false
  }
  showErrorAlert() {
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
    }, 3000);
  }

  dismissAlert() {
    this.showSuccess = false;
  }

  filterItems(): void {
    console.log('Todo List:', this.todoList);
    console.log('Search Term:', this.search);

    if (this.todoList && this.todoList.length > 0) {
      this.filteredItems = this.todoList.filter((todo: any) =>
        todo.todo && todo.todo.toLowerCase().includes(this.search.toLowerCase())
      );
      console.log('Filtered Items:', this.filteredItems);
    } else {
      this.filteredItems = [];
    }
  }


  addTodo() {
    if (this.todo.trim() !== '') {
      this.todoService.addTodo(this.todo);
      this.showSuccessAlert()
      this.todo = '';
      this.getTodoListByUser()
    }
  }


  editedTodoId: number | null = null;

  editTodo(todo: any) {
    this.editedTodoId = todo.id;
    this.updatedText = todo.todo;
  }
  updateTodo() {
    if (this.editedTodoId !== null && this.updatedText.trim() !== '') {
      this.todoService.updateTodo(this.editedTodoId, this.updatedText).subscribe(() => {
        this.editedTodoId = null;
        this.updatedText = '';
        Swal.fire({
          icon: 'success',
          title: 'Todo updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.getTodoListByUser();

      });
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Please add your changes',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  date() {
    let date = new Date()
  }


  getTodoListByUser() {
    const currentUserId = this.todoService.getCurrentUserId();

    if (currentUserId !== null) {
      this.todoService.getTodoListByUser(currentUserId).subscribe((data: any[]) => {
        this.todoList = data;
        this.filteredItems = this.todoList
      });
    }
  }




  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.showErrorAlert()
      this.getTodoListByUser()
    });
  }

  deleteEntireDatabase() {
    this.todoService.deleteDatabase()


      .then(() => {
        console.log('Database deleted')
      }).catch(error => {
        console.error('Error: ' + error);
      });
  }

}
