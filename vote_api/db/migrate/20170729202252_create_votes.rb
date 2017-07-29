class CreateVotes < ActiveRecord::Migration[5.1]
  def change
    create_table :votes do |t|
      t.belongs_to :user
      t.references :trip_place

      t.integer :value
      t.datetime :created_at
    end
  end
end
