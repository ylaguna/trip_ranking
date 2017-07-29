class CreateTripPlaces < ActiveRecord::Migration[5.1]
  def change
    create_table :trip_places do |t|
      t.string :name
      t.string :url

      t.timestamps
    end
  end
end
