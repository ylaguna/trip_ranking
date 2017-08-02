import { Vote } from "../models/vote";
import { PlaceOption } from "../models/place-option";

const VoteFactory  = (trip_options : PlaceOption[]) : Vote[] => {
    var votes : Vote[] = []
    trip_options.forEach(trip_option =>
        votes.push(new Vote(trip_option))
    )

    return votes;
}

export default VoteFactory