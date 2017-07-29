module TripService
    def self.list_places
        TripPlace.all.map do |place|
            place.map_to_api
        end
    end

    def self.vote(params)
        #data = Person.new(params)
        #data.save
    end

    def self.get_ranking

    end
end