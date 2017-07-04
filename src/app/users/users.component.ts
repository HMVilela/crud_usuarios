import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';


@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ UsersService ]
  
})
export class UsersComponent implements OnInit {

  constructor(
    private _usersService: UsersService, 
    private confirmationService: ConfirmationService, 
    private route: ActivatedRoute,
    private location: Location
    ) { }

  users: any;
  msgs: any;
  
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  created: string;
  modified: string;

  userDetailsDialog: boolean = false;
  deleteDialog: boolean = false;

  ngOnInit() {
    this.users = [];
    this._usersService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  updateUser() {  
    var _user = {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      created: this.created,
      modified: this.modified
    };
    this._usersService.updateUser(_user)
      .subscribe(data => {
        this.ngOnInit();
        this.userDetailsDialog = false;
        this.ngOnInit();
      });
  }

  deleteUser(user) {
    var users = this.users;

    this._usersService.deleteUser(user._id)
      .subscribe(data => {
        if (data.n == 1) {
          for (var i = 0; i < users.length; i++) {
            if (users[i]._id == users._id) {
              users.splice(i, 1);
            }
          }
        }
      })
  }

  showUserDialog(userSelected: any) {
    console.log(userSelected);

    this._id = userSelected._id;
    this.firstName = userSelected.firstName;
    this.lastName = userSelected.lastName;
    this.email = userSelected.email;
    this.password = userSelected.password;
    this.created = userSelected.created;
    this.modified = userSelected.modified;

    this.userDetailsDialog = true;
  }

  showDeleteDialog(user: any) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que quer deletar este usuário?',
      header: 'Confirmação de deleção',
      icon: 'fa fa-trash',
      accept: () => {
        this.deleteUser(user);
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
        this.ngOnInit();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

}
