module TripService
    def self.list_places
        begin
            places = TripPlace.all.map do |place|
                place.map_to_list
            end

            return { succeeded: true, result: places }
        rescue Exception => e
            return { succeeded: false, error_message: e.message }
        end
    end

    def self.vote(person_params)
        begin
            person = Person.new(name: person_params[:name], email: person_params[:email])
            person.set_votes(person_params[:votes])

            raise person.errors if not person.valid?
            person.save

            return { succeeded: true}

        rescue Exception => e
            return { succeeded: false, error_message: e.message }
        end
    end

    def self.get_ranking
        begin

            places = TripPlace.all.map do |place|
                place.map_to_ranking
            end

            places = places.sort_by{|x| -x[:score]}

            return { succeeded: true, result: places}


        rescue Exception => e
            return { succeeded: false, error_message: e.message }
        end
    end
end