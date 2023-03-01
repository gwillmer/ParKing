import { Component } from '@angular/core';
//import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(/*private Auth: AuthService*/) { }

  loginUser(event: any) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

    //this.Auth.getUserDetails(username, password)
    console.log(username, password)
  }

}

