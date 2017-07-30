class TripPlace < ApplicationRecord
    has_many :votes
    attr_reader :score

    def map_to_list
        return {
            id: self.id, name: self.name, photo_url: self.photo_url
        }
    end

    def map_to_ranking
        return {
            id: self.id, name: self.name, photo_url: self.photo_url, score: self.score
        }
    end

    def score
        self.votes.sum(:value)
    end

end
