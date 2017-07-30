module ScoreCalculator

    def self.get_personal(person)
        Person.last.votes.map do |vote|
            trip_place = vote.trip_place.map_to_list
            trip_place[:score] = vote.value
            trip_place
        end
    end

    def self.get_global
        return TripPlace.all.map do |place|
            place.map_to_ranking
        end
    end
end