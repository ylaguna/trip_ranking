module TripService
    def self.list_places
        TripPlace.all.map do |place|
            place.map_to_api
        end
    end

    def self.vote(person_params)

        begin
            person = Person.new(name: person_params[:name], email: person_params[:email])
            person.set_votes(person_params[:votes])

            raise person.errors if not person.valid?
            person.save
            { status: "OK"}
        rescue Exception => e
            { status: "Error", message: e.message }
        end
    end

    def self.get_ranking

    end
end