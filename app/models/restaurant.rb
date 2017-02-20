class Restaurant < ApplicationRecord
  include ActiveModel::AttributeMethods
  include ActiveModel::Serialization
  attr_reader :genre_letter

  enum genre: [:sushi, :burgers]
  validates :name, presence: true, length: { minimum: 2 }, uniqueness: true
  validates :rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }
  validates :genre, presence: true, inclusion: { in: genres.keys }
  validates :delivery_time, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 120 }
  validates :accepts_10bis, presence: true, inclusion: { in: [true, false] }

  has_many :reviews

  def attributes
    {
      id: nil,
      name: nil,
      rating: nil,
      genre: nil,
      delivery_time: nil,
      accepts_10bis: nil,
      genre_letter: genre_letter,
    }
  end

  def genre_letter
    case genre.to_sym
      when :sushi
        'D'
      when :burgers
        'A'
    end
  end
end
