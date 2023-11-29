import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './auth/authguard.guard';
import { SitelayoutComponent } from './layouts/sitelayout/sitelayout.component';
import { ApplayoutComponent } from './layouts/applayout/applayout.component';
import { RegistorComponent } from './pages/registor/registor.component';

const routes: Routes = [

  {
    path: '',
    component: SitelayoutComponent,

    children: [
      { path: '', component: LoginComponent, pathMatch: 'full', data: { title: 'Login to your Account' }, },
      {
        path: 'login', component: LoginComponent, pathMatch: 'full', data: { title: 'Login to your Account' },
      },
      { path: 'registor', component: RegistorComponent, pathMatch: 'full', data: { title: 'Registor your Account' } },
    ]
  },

  {
    path: '',
    component: ApplayoutComponent,
    children: [
      {
        path: 'profile', component: ProfileComponent,
        data: { title: 'Profile' },
        canActivate: [authGuard],

      },

    ]
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
