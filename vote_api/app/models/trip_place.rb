class TripPlace < ApplicationRecord
    has_many :votes

    def map_to_api
        return {
            id: self.id, name: self.name, photo_url: self.photo_url
        }
    end

end
