class Person < ApplicationRecord
    include ActiveModel::Validations
    has_many :votes

    validates :name, presence: true
    validates :email, presence: true
    # validates_with PersonVotesValidator

    def set_votes(array_of_votes)
        array_of_votes.each do |vote_hash|
            self.votes << Vote.new(vote_hash)
        end

    end

end
