import { TripPlace } from "./trip-place";

export class Vote {

  constructor(place : TripPlace){
    this.trip_place_id = place.id
    this.value = place.score
  }

  trip_place_id : number
  value : number
}