class Person < ApplicationRecord
    include ActiveModel::Validations
    has_many :votes

    validates :name, presence: true
    validates :email, presence: true
    validates_with PersonVotesValidator
end
