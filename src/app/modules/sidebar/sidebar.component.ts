import { Component, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menu = false;
  btnload = false;
  chats: any = new Array(2);
  plan: any;
  data: any;
  search: any;
  name: any;

  projectForm!: FormGroup;
  editprojectForm!: FormGroup;

  submitted = false;
  projects: any = [];
  projectfound = false;

  isSidebarOpen2 = false;

  get f(): { [key: string]: AbstractControl } {
    return this.projectForm.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.editprojectForm.controls;
  }

  constructor(private auth: AuthService) {
    this.isSidebarOpen2 = this.auth.getsidebarstate()
    this.auth.sidebarStateChange.subscribe((state) => {
      this.isSidebarOpen2 = state
    });
  }

}
