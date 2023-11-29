import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './modules/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApplayoutComponent } from './layouts/applayout/applayout.component';
import { SitelayoutComponent } from './layouts/sitelayout/sitelayout.component';
import { FooterComponent } from './modules/footer/footer.component';
import { RegistorComponent } from './pages/registor/registor.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { CoursesComponent } from './shared/courses/courses.component';
import { FilterComponent } from './shared/filter/filter.component';
import { TodoComponent } from './shared/todo/todo.component';
import { DynamicFormComponent } from './shared/dynamic-form/dynamic-form.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { NgxEditorModule } from 'ngx-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


const dbConfig: DBConfig = {
  name: 'MyDatabase',
  version: 8,
  objectStoresMeta: [
    {
      store: 'Todos',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'todo', keypath: 'todo', options: { unique: false } },
        { name: 'userId', keypath: 'userId', options: { unique: false } },
      ],
    },
    {
      store: 'users',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'email', keypath: 'email', options: { unique: true } },
        { name: 'password', keypath: 'password', options: { unique: false } },
        { name: 'name', keypath: 'name', options: { unique: false } },
      ],
    },
  ],
};



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HeaderComponent,
    ApplayoutComponent,
    SitelayoutComponent,
    FooterComponent,
    RegistorComponent,
    SidebarComponent,
    CoursesComponent,
    FilterComponent,
    TodoComponent,
    DynamicFormComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
