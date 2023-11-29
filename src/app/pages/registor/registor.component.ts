import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/auth/todo.service';

@Component({
  selector: 'app-registor',
  templateUrl: './registor.component.html',
  styleUrls: ['./registor.component.css']
})
export class RegistorComponent {

  registrationForm: FormGroup;
  registrationError: string | null = null;

  constructor(private todoService: TodoService, private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registerUser() {
    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password;
    let name = this.registrationForm.value.name
    // this.todoService.name(name)
    this.todoService.registerUser(email, password, name)
    alert('Registration successful')
    this.router.navigate(['/profile']);
  }
}