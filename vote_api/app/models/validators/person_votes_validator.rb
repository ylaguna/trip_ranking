class PersonVotesValidator < ActiveModel::Validator
    def validate(record)
        count_places = TripPlace.count

        if( record.votes.size !=  count_places)
            record.errors.add :votes, "You need to have #{count_places} votes."
        end
    end
end