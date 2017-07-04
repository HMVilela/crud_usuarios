import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { UsersRoutingModule } from './home/home-routing.module';

import { DialogModule } from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';


import { AppComponent } from './app.component';

import { AlertModule } from 'ngx-bootstrap';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    AlertModule.forRoot(),
    BrowserModule,
    ButtonModule,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    HttpModule,
    MessagesModule,
    SpinnerModule,
    UsersRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
