import { Component, OnInit } from '@angular/core';

import { TripPlace } from './trip-place';
import { TripService } from './trip.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
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
