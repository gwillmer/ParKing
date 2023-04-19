

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private httpClient: HttpClient,private router: Router,private authService: AuthService) { 
    
  }

  logout(){
    this.authService.loggedIn = false;
    this.router.navigate(['home'])
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    this.httpClient.get('http://localhost:8080/profile', { headers }).subscribe((response: any) => {
      this.user = response;
    });
  }
} 

/*
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileResponse } from '../GoDojo/main.go';


interface ProfileResponse {
  id: number;
  phone_number: number;
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: ProfileResponse;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<ProfileResponse>('http://localhost:8080/profile').subscribe(
      (response) => {
        this.profileData = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
*/
