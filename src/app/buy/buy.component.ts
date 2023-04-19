import { Component } from '@angular/core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent {
  title = 'My first AGM project';
  lat1 =  29.649622559291554;
  lng1 = -82.33813124232903;
  lat2 = 25.692014896803297;
  lng2 = -80.34611209225112;
  lat3 = 25.690763747181652;
  lng3 = -80.15951154758172;

  onMouseOver(infoWindow: any, $event: MouseEvent) {
    infoWindow.open();
  }

  onMouseOut(infoWindow: any, $event: MouseEvent) {
    infoWindow.close();
  }

}
