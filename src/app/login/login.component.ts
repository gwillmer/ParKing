import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginEmail: string | null = null
  loginPassword: string | null = null
  showEmailAlert: boolean = false
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ){
  }
  validateEmail(email: string | null): boolean{
    if (!email) {
      return true;
    }
    // Regular expression to check for valid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  infocheck(){
    if (!this.validateEmail(this.loginEmail)) {
      this.showEmailAlert = true;
    }
    else {
      this.showEmailAlert = false;
  }
}

/*
  login(){
    this.httpClient.post('http://localhost:8080/login', {
      email: this.loginEmail,
      password: this.loginPassword
    }).subscribe((response: any) => {
      if(response){
        localStorage.setItem('token', response.jwt)
        this.router.navigate(['profile'])
        //bool login == true change hot bar
      }
      this.loginPassword = null
    })
  }
}
*/

login(){
  this.httpClient.post('http://localhost:8080/login', {
    email: this.loginEmail,
    password: this.loginPassword
  }).subscribe((response: any) => {
    if(response){
      localStorage.setItem('token', response.jwt)
      localStorage.setItem('user', JSON.stringify(response.user)) // Store user info in local storage
      this.router.navigate(['profile'])
      //bool login == true change hot bar
    }
    this.loginPassword = null
  })
}
}


/*
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginEmail: string | null = null
  loginPassword: string | null = null
  constructor(
    private httpClient: HttpClient,
    private router: Router) { 
  }
  login(){
    this.httpClient.post('http://localhost:8080/login', {
      email: this.loginEmail,
      password: this.loginPassword
    }).subscribe((response: any) => {
      if(response){
        localStorage.setItem('token', response.jwt)
        this.router.navigate(['profile'])
      }
      this.loginEmail = null
      this.loginPassword = null
    })
  }
}
*/

  /*
  loginUser(event: any) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    //this.Auth.getUserDetails(username, password)
    console.log(username, password)
  }
  */