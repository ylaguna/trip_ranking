import { TripPlace } from "./trip-place";

export class PlaceChoice {

  constructor(place : TripPlace)
  {
    this.place = place;
    this.games = [];
    this.wins = [];
    this.loses = [];
  }

  place : TripPlace
  games : PlaceChoice[]
  wins : PlaceChoice[]
  loses : PlaceChoice[]
}