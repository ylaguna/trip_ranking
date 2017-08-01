import { TripPlace } from "../models/trip-place";

const TripPlaceFactory  = (obj) : TripPlace => {

    var place = new TripPlace()
    place.id = obj.id;
    place.name = obj.name;
    // place.PhotoUrl = obj.photo_url;
    place.score = obj.score;

    return place;
}

export default TripPlaceFactory