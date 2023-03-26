import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
//import { GoogleMapsModule } from '@angular/google-maps'


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
}
