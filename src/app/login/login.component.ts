import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { RouterModule, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UsersService ]
})
export class LoginComponent implements OnInit {

  constructor(
    private _usersService: UsersService,
    private router: Router) { }

  loginEmail: string;
  loginPassword: string;
  loginElement: string;
  info: string;

  registrationDialog: boolean = false;

  
  rfirstName: string;
  rlastName: string;
  remail: string;
  rpassword: string;

  ngOnInit() {
  }

  login() {
    var credentials = {
      email: this.loginEmail,
      password: this.loginPassword
    }
    console.log(credentials);
    this._usersService.login(credentials)
      .subscribe(data => {
        this.loginElement = data.token;
        if(this.loginElement) {
          this._usersService.saveData(this.loginElement);
          this.router.navigate(["/users"]);
        } else {
          this.info = "Algo errado";
        }        
      });
  }

  showRegistrationDialog() {
    this.registrationDialog = true;
  }

  registration() {
    var newUser = {
      firstName: this.rfirstName,
      lastName: this.rlastName,
      email: this.remail,
      password: this.rpassword
    };
    this._usersService.saveUser(newUser)
      .subscribe(data => {
        this.registrationDialog = false;
      });
  }

}
