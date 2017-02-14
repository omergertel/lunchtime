class CreateRestaurants < ActiveRecord::Migration[5.0]
  def change
    create_table :restaurants do |t|
      t.string  :name, unique: true
      t.integer :rating
      t.integer :genre
      t.boolean :accepts_10bis
      t.string  :address
      t.integer :delivery_time

      t.timestamps
    end
  end
end
