import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent {
  listingAddress: string | null = null
  listingZipCode: string | null = null
  listingState: string | null = null
  listingSize: string | null = null
  listingStartDate: string | null = null
  listingEndDate: string | null = null
  listingDescription: string | null = null
  listingImagePath: string | null = null
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ){
  }
  listing(){
    this.httpClient.post('http://localhost:8080/special-events', {
      address: this.listingAddress,
      zipCode: this.listingZipCode,
      state: this.listingState,
      size: this.listingSize,
      startDate: this.listingStartDate,
      endDate: this.listingEndDate,
      description: this.listingDescription
    }).subscribe((response: any) => {
      if(response){
        localStorage.setItem('token', response.jwt)
        this.router.navigate(['buy'])
      }
      this.listingAddress = null
      this.listingZipCode = null
      this.listingState = null
      this.listingSize = null
      this.listingStartDate = null
      this.listingEndDate = null
      this.listingDescription = null
    })
  }
}
