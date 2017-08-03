import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TripPlace } from '../models/trip-place';
import { environment } from "../../environments/environment";


@Injectable()
export class TripService {
  private placesUrl = environment.serverUrl + '/api/trip/places';
  private rankingUrl = environment.serverUrl + '/api/trip/ranking';

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