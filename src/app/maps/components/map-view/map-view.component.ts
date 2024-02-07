import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Map, Popup, Marker} from "mapbox-gl";
import {MapService, PlacesService} from "../../services";

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild("mapDiv") mapDivElement!: ElementRef;

  constructor(private placesService: PlacesService, private mapService: MapService) {
  }

  ngAfterViewInit(): void {
    if (!this.placesService.useLocation) throw new Error('No placesService.useLocation');
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.useLocation, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
      <h6>Here am I</h6>
      <span>I am in this place in the world</span>
      `);
    new Marker({color: 'red'})
      .setLngLat(this.placesService.useLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map);
  }
}
