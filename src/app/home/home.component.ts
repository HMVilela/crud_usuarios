import { Component, OnInit } from '@angular/core';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { UsersService } from '../services/users.service';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ ConfirmationService, UsersService ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
