import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {

  weatherForm!: FormGroup;
  weatherData: any;
  weatherImg: any;
  selectedOption: number = 1;
  addForm!: FormGroup;
  todos: any[] = [];
  submittedform = false;
  hour: any;
  rate: any;
  total: any;
  hour2: any;
  rate2: any;
  total2: any;
  Dayone: any;
  Daytwo: any;

  daysForm: FormGroup;
  days: any[] = [];


  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.auth.profile()
    this.daysForm = this.fb.group({});

  }

  ngOnInit() {
    this.weatherForm = this.fb.group({
      location: ['']

    });


    this.addForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      person: ['', Validators.required],
      hour: [''],
      rate: [''],
      person2: ['', Validators.required],
      hour2: [''],
      rate2: [''],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addForm.controls;
  }
  reset() {
    this.addForm.reset();
  }


  submitForm() {
    const todo = this.addForm.value;
    console.log(todo);
    if (todo !== '') {
      this.submittedform = true;
      this.todos.push(todo);
      console.log(this.todos);
      this.reset();
    } else {
      this.submittedform = true;
    }
  }

  addDay() {
    this.days.push({
      person: ['', Validators.required],
      hour: null,
      rate: null,
    });

    const dayIndex = this.days.length - 1;
    this.daysForm.addControl(`person${dayIndex}`, this.fb.control('', Validators.required));
    this.daysForm.addControl(`hour${dayIndex}`, this.fb.control(null));
    this.daysForm.addControl(`rate${dayIndex}`, this.fb.control(null));
  }

  removeDay(index: number) {
    this.days.splice(index, 1);
    // this.daysForm.removeControl(`person${index}`);
    // this.daysForm.removeControl(`hour${index}`);
    // this.daysForm.removeControl(`rate${index}`);
  }

  calculateDayTotal(index: number): number {
    const person = this.daysForm.value['person' + index];
    const hour = this.daysForm.value['hour' + index];
    const rate = this.daysForm.value['rate' + index];

    if (person && hour !== null && rate !== null) {
      const total = hour * rate;
      console.log(total);
      return total;
    }

    return 0;
  }
  calculateSumOfDayTotals() {
    let total = 0;
    for (let i = 0; i < this.days.length; i++) {
      total += this.calculateDayTotal(i)
    }
    return total
  }
}
