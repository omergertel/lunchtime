class Restaurant < ApplicationRecord
  include ActiveModel::AttributeMethods

  enum genre: [:sushi, :burgers]
  validates :name, presence: true, length: { minimum: 2 }, uniqueness: true
  validates :rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }
  validates :genre, presence: true, inclusion: { in: genres.keys }
  validates :delivery_time, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 120 }
  validates :accepts_10bis, inclusion: { in: [true, false] }
  attr_accessor :genre_letter

  has_many :reviews

  def genre_letter
    case genre.to_sym
      when :sushi
        'D'
      when :burgers
        'A'
    end
  end
end
