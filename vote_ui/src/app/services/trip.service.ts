import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TripPlace } from '../models/trip-place';

@Injectable()
export class TripService {
  private placesUrl = 'http://localhost:3000/api/trip/places';  // URL to web api
  private rankingUrl = 'http://localhost:3000/api/trip/ranking';  // URL to web api

  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  getRanking(): Promise<TripPlace[]> {
    return this.http.get(this.rankingUrl)
             .toPromise()
             .then(response => response.json().result as TripPlace[])
             .catch(this.handleError);
  }

  getPlaces(): Promise<TripPlace[]> {
    return this.http.get(this.placesUrl)
             .toPromise()
             .then(response => response.json().result as TripPlace[])
             .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}