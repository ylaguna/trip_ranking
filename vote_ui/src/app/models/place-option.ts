import { TripPlace } from "./trip-place";

export class PlaceOption {

  constructor(place : TripPlace)
  {
    this.place = place;
    this.games = [];
    this.wins = [];
    this.loses = [];
  }

  place : TripPlace
  games : PlaceOption[]
  wins : PlaceOption[]
  loses : PlaceOption[]
}