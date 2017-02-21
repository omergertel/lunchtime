class Review < ApplicationRecord
  belongs_to :restaurant

  validates :name, presence: true, length: { minimum: 2 }
  validates :rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }

  after_save :calc_restaurant_rating!
  after_destroy :calc_restaurant_rating!

  private

  def calc_restaurant_rating!
    rating = restaurant.reviews.average(:rating) || 0
    restaurant.update!(rating: rating.round)
  end
end
