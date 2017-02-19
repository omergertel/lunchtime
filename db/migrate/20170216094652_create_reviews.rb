class CreateReviews < ActiveRecord::Migration[5.0]
  def change
    create_table :reviews do |t|
      t.belongs_to :restaurant, index: true, unique: true, foreign_key: true
      t.integer :rating
      t.string :name
      t.string :comment

      t.timestamps
    end
  end
end
