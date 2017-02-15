class Restaurant < ApplicationRecord
  enum genre: [:sushi, :burgers]
  validates :name, presence: true, length: { minimum: 2 }, uniqueness: true
  validates :rating, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }
  validates :genre, presence: true, inclusion: { in: genres.keys }
  validates :delivery_time, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 120 }
  validates :accepts_10bis, inclusion: { in: [true, false] }
end
