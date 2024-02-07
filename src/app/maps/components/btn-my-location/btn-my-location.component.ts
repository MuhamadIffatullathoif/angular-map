import {Component} from '@angular/core';
import {MapService, PlacesService} from "../../services";

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  constructor(private placesService: PlacesService, private mapService: MapService) {
  }

  gotoMyLocation(): void {
    if (!this.placesService.useLocation) throw new Error('There is no user location');
    if (!this.mapService.isMapReady) throw new Error('No map available');
    this.mapService.flyTo(this.placesService.useLocation!);
  }
}
