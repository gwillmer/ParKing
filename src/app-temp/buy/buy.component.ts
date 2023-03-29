import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
//import { GoogleMapsModule } from '@angular/google-maps'


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
}
