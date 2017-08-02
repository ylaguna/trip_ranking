import { TripPlace } from "./trip-place";
import { PlaceChoice } from "./place-choice";

export class Vote {

  constructor(choice : PlaceChoice){
    this.trip_place_id = choice.place.id
    this.value = choice.wins.length + 1
  }1

  trip_place_id : number
  value : number
}