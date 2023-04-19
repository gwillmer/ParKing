import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerFirstName: string | null = null
  registerLastName: string | null = null
  registerEmail: string | null = null
  registerPassword: string | null = null
  confirmPassword: string | null = null
  registerPhoneNumber: string | null = null
  showEmailAlert: boolean = false
  showPWAlert: boolean = false
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
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
    if (!this.validateEmail(this.registerEmail)) {
      this.showEmailAlert = true;
    }
    else {
      this.showEmailAlert = false;
    }
    if (this.registerPassword != this.confirmPassword){
      this.showPWAlert = true;
    }
    else{
      this.showPWAlert = false;
    }
  }
  register(){
    //alert('Please enter a valid email address.');
    console.log(this.registerFirstName, this.registerPassword)
    this.httpClient.post('http://localhost:8080/register', {
      firstName: this.registerFirstName,
      lastName: this.registerLastName,
      email: this.registerEmail,
      password: this.registerPassword,
      confirmpassword: this.confirmPassword,
      phoneNumber: this.registerPhoneNumber
    }).subscribe((response: any) => {
      if(response){
        localStorage.setItem('token', response.jwt)
        this.authService.loggedIn = true;
        this.router.navigate(['profile'])
      }
      this.registerFirstName = null
      this.registerLastName = null
      this.registerEmail = null
      this.registerPassword = null
      this.registerPhoneNumber = null
    })

  
}
}

/*import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerFirstName: string | null = null
  registerLastName: string | null = null
  registerEmail: string | null = null
  registerUsername: string | null = null
  registerPassword: string | null = null
  registerPhoneNumber: string | null = null

  constructor(
    private httpClient: HttpClient,
    private router: Router) { 
  }

  register(){
    console.log(this.registerFirstName, this.registerPassword)
    this.httpClient.post('http://localhost:8080/register', {
      firstName: this.registerFirstName,
      lastName: this.registerLastName,
      email: this.registerEmail,
      username: this.registerUsername,
      password: this.registerPassword,
      phonenumber: this.registerPhoneNumber
    }).subscribe((response: any) => {
      if(response){
        localStorage.setItem('token', response.jwt)
        this.router.navigate(['profile'])
      }
      this.registerFirstName = null
      this.registerLastName = null
      this.registerEmail = null
      this.registerUsername = null
      this.registerPassword = null
      this.registerPhoneNumber = null
    })
  }

}*/
