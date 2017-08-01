import { Component, OnInit } from '@angular/core';

import { TripPlace } from '../models/trip-place';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'home',
  templateUrl: '../templates/home.component.html',
  // styleUrls: ['./app.component.css']
})
export class HomeComponent {

  places: TripPlace[] = [];

  constructor(private service: TripService) { }

  ngOnInit(): void {
    this.service.getRanking()
      .then(places => this.places = places);
  }
}
