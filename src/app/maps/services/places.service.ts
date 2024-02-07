import {Injectable} from '@angular/core';
import {Feature, PlacesResponse} from "../interfaces/places";
import {PlacesApiClient} from "../api";
import {MapService} from "./map.service";


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public useLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(private placesApi: PlacesApiClient, private mapService: MapService) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('Could not get geolocation');
          console.log(err);
          reject();
        })
    })
  }

  getPlaceByQuery(query: string = '') {
    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }
    if (!this.useLocation) throw Error('No use location');
    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.useLocation!.join(",")
      }
    })
      .subscribe(res => {
        this.isLoadingPlaces = false;
        this.places = res.features;
        this.mapService.createMarkersFromPlaces(this.places, this.useLocation!);
      })
  }

  deletePlace() {
    this.places = [];
  }
}
