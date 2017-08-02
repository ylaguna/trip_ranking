import { TripPlace } from "./trip-place";
import { PlaceOption } from "./place-option";

export class Vote {

  constructor(choice : PlaceOption){
    this.trip_place_id = choice.place.id
    this.value = choice.wins.length + 1
  }1

  trip_place_id : number
  value : number
}