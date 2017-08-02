import { TripPlace } from "./trip-place";
import { PlaceOption } from "./place-option";

export class EmptyOption extends PlaceOption {

    constructor() {
      super(new TripPlace())
    }
}