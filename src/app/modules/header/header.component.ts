
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TodoService } from 'src/app/auth/todo.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profilePic: any;


  @ViewChild('closebutton') closebutton: any;
  constructor(
    private router: Router,
    public auth: AuthService,
    public todoService: TodoService
  ) { }


  ngOnInit(): void {


  }

  logOut() {
    this.todoService.logout();

  }
  // userProfile() {
  //   this.name = this.todoService.getCurrentUserName();
  //   // this.name = 'Akil Mehar';
  //   console.log(this.name)
  // }




  onMenuButtonClick(): void {
    this.auth.toggleSidebarState();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }



}
