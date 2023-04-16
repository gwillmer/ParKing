import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent {
  states = [
    {id: 1, name: "AL"},
    {id: 2, name: "AK"},
    {id: 3, name: "AZ"},
    {id: 4, name: "AR"},
    {id: 5, name: "CA"},
    {id: 6, name: "CO"},
    {id: 7, name: "CT"},
    {id: 8, name: "DE"},
    {id: 9, name: "DC"},
    {id: 10, name: "FL"},
    {id: 11, name: "GA"},
    {id: 12, name: "HI"},
    {id: 13, name: "ID"},
    {id: 14, name: "IL"},
    {id: 15, name: "IN"},
    {id: 16, name: "IA"},
    {id: 17, name: "KS"},
    {id: 18, name: "KY"},
    {id: 19, name: "LA"},
    {id: 20, name: "ME"},
    {id: 21, name: "MD"},
    {id: 22, name: "MA"},
    {id: 23, name: "MI"},
    {id: 24, name: "MN"},
    {id: 25, name: "MS"},
    {id: 26, name: "MO"},
    {id: 27, name: "MT"},
    {id: 28, name: "NE"},
    {id: 29, name: "NV"},
    {id: 30, name: "NH"},
    {id: 31, name: "NJ"},
    {id: 32, name: "NM"},
    {id: 33, name: "NY"},
    {id: 34, name: "NC"},
    {id: 35, name: "ND"},
    {id: 36, name: "OH"},
    {id: 37, name: "OK"},
    {id: 38, name: "OR"},
    {id: 39, name: "PA"},
    {id: 40, name: "RI"},
    {id: 41, name: "SC"},
    {id: 42, name: "SD"},
    {id: 43, name: "TN"},
    {id: 44, name: "TX"},
    {id: 45, name: "UT"},
    {id: 46, name: "VT"},
    {id: 47, name: "VA"},
    {id: 48, name: "WA"},
    {id: 49, name: "WV"},
    {id: 50, name: "WI"},
    {id: 51, name: "WY"},
  ];
  sizes = [
    {id: 1, name: "U.S. Compact - 8ft x 16ft"},
    {id: 2, name: "U.S. Standard - 8.6ft x 18ft"},
    {id: 3, name: "U.S. Large - 9ft x 20ft"},
    {id: 4, name: "Small RV and Boat - 12ft x 20ft"},
    {id: 5, name: "Medium RV and Boat"},
    {id: 6, name: "Large RV and Boat"},
    {id: 7, name: "Small Trucker - 15ft x 30ft"},
    {id: 8, name: "Large Trucker - 15ft x 40ft"},
  ];
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
        this.router.navigate(['profile'])
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
