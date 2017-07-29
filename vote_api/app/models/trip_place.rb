class TripPlace < ApplicationRecord


    def map_to_api
        return {
            id: self.id, name: self.name, photo_url: self.photo_url
        }
    end

end
