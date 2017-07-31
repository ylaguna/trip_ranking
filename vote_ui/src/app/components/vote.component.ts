import { Component, OnInit } from '@angular/core';

import { TripPlace } from '../models/trip-place';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'vote',
  templateUrl: '../templates/voting.component.html',
  // styleUrls: ['./app.component.css']
})
export class VoteComponent {

  places: TripPlace[] = [];

  leftPlace : TripPlace
  righPlace : TripPlace
  constructor(private service: TripService) { }


  ngOnInit(): void {
    this.service.getPlaces()
      .then(places => this.initialize(places));
  }

  initialize(places: TripPlace[]) : void  {
    this.places = places;
    this.leftPlace = places[0];
    this.righPlace = places[places.length - 1]
  }


}
