import { PlaceChoice } from "../models/place-choice";
import { Vote } from "../models/vote";

const VoteFactory  = (trip_options : PlaceChoice[]) : Vote[] => {
    var votes : Vote[] = []
    trip_options.forEach(trip_option =>
        votes.push(new Vote(trip_option))
    )

    return votes;
}

export default VoteFactory