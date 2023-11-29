import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const API_URL = environment.apiurl;
interface auth {
  status: any;
  data: any;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  getapi() {
    return API_URL
  }
  getToken() {
    if (localStorage.getItem('token') != null) {
      return localStorage.getItem('token')

    } else {
      return null
    }
  }

  isLogin() {
    return !!localStorage.getItem('token')
  }

  login(body: any) {
    this.http.post(API_URL + 'login', body).subscribe({
      next: (res: any) => {
        if (res) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['profile']);
        }
      }, error: (err) => {
        console.log(err)
      },
    })
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userdata');
    this.router.navigate(['']);
  }
  getWeather(location: string): Observable<any> {
    const apiKey = '6a0737d6e44e834e8f65b31d977a5505';
    const apiUrl = `http://api.weatherstack.com/current?access_key=6a0737d6e44e834e8f65b31d977a5505&query=${location}`;

    return this.http.get(apiUrl);
  }

  ngOnInit() {
    this.toggleSidebarState()
    this.sidebarStateChange
  }

  isSidebarOpen = false;
  sidebarStateChange = new EventEmitter<boolean>();

  toggleSidebarState(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarStateChange.emit(this.isSidebarOpen);
  }

  getsidebarstate() {
    return this.isSidebarOpen;

  }
  profile() {
    const headers = new HttpHeaders({ "Authorization": `bearer ${this.getToken()}` });
    this.http.post(API_URL + 'profile', {}, { headers }).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('userdata', JSON.stringify(res.userData.user.username))

      }, error: (err) => {
        console.log(err)
      },
    })
  }


  post(ep: any, q: any) {
    var token = this.getToken()
    if (token) {
      return this.http.post<auth>(API_URL + ep, q, {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      });
    } else {
      return this.http.post<auth>(API_URL + ep, q);
    }
  }
}
