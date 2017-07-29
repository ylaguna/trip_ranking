class Vote < ApplicationRecord
    belongs_to :person
    references :trip_place
end
