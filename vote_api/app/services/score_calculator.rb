module ScoreCalculator

    def self.get_personal(person)
        places_list = Person.last.votes.map do |vote|
            trip_place = vote.trip_place.map_to_list
            trip_place[:score] = vote.value
            trip_place
        end

        places_list.sort_by{|x| -x[:score]}
    end

    def self.get_global

        places_list = TripPlace.all.map do |place|
            place.map_to_ranking
        end

        places_list.sort_by{|x| -x[:score]}
        # places.order_by(|x| -x[:score])
    end
end