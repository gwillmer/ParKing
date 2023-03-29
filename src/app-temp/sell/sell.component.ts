import { Component } from '@angular/core';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent {

}
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
