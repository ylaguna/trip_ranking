import { TripPlace } from "./trip-place";

export class PlaceChoice {

  constructor(place : TripPlace)
  {
    this.place = place;
    this.games = [];
    this.wins = [];
  }

  place : TripPlace
  games : number[]
  wins : number[]
}