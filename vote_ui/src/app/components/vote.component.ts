import { Component, OnInit } from '@angular/core';

import { TripPlace } from '../models/trip-place';
import { TripService } from '../services/trip.service';


import { LinqService } from 'ng2-linq';


@Component({
  providers: [LinqService],
  selector: 'vote',
  templateUrl: '../templates/voting.component.html',
  // styleUrls: ['./app.component.css']
})
export class VoteComponent {

  places: TripPlace[] = [];

  leftPlace : TripPlace
  rightPlace : TripPlace
  constructor(private service: TripService, private linq: LinqService) { }


  ngOnInit(): void {
    this.service.getPlaces()
      .then(places => this.initialize(places));
  }

  initialize(places: TripPlace[]) : void  {
    this.places = places;

    for (let place of this.places) {
      place.score = 0;
    }

    this.leftPlace = places[0];
    this.rightPlace = places[places.length - 1]
  }

  left() : void {
    this.leftPlace.score ++;
    this.leftPlace = this.getLast(this.rightPlace)
  }

  right() : void {
    this.rightPlace.score ++;
    this.rightPlace = this.getLast(this.leftPlace)
  }

  getLast(place) : TripPlace {
    const lastScored = this.linq.Enumerable().From(this.places)
    .Where(function(x){
      return x.id != place.id
    }).OrderBy(function (x) {
        return x.score
    }).Select(function(x){
      return x;
    }).First();

    return lastScored;
    // return validPlaces.sort(x => x.score)[0]
  }

}
