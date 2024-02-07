import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Feature, PlacesResponse} from "../interfaces/places";

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

  constructor(private httpClient: HttpClient) {
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
    this.isLoadingPlaces = true;
    this.httpClient.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=ip&language=id&access_token=pk.eyJ1IjoiaWZmYXQxOTk3IiwiYSI6ImNscm16cGw4NzExcGQyanB3NHQ1ajNlbnEifQ.wPAAN7tQBA8Lk7881JaSBw`)
      .subscribe(res => {
        this.isLoadingPlaces = false;
        this.places = res.features;
      })
  }
}
