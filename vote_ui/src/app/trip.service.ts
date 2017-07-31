import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TripPlace } from './trip-place';

@Injectable()
export class TripService {
  private placesUrl = 'http://localhost:3000/api/trip/places';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  getPlaces(): Promise<TripPlace[]> {
    return this.http.get(this.placesUrl)
             .toPromise()
             .then(response => response.json().data as TripPlace[])
             .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}