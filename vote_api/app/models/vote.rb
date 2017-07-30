class Vote < ApplicationRecord
    belongs_to :person
    belongs_to :trip_place
end
