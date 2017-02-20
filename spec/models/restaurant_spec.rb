require 'rails_helper'

RSpec.describe Restaurant, type: :model do
  let(:rest) do
    {
      name: 'Name',
      genre: :sushi,
      rating: 1,
      accepts_10bis: true,
      delivery_time: :slow
    }
  end

  describe 'validations' do
    it 'should require all fields except address' do
      rest.keys.each do |field|
        bad_rest = rest.select { |k, _v| k != field }
        expect(Restaurant.new(bad_rest).valid?).to be false
      end
    end

    it 'should validate name length' do
      rest[:name] = 'N'
      expect(Restaurant.new(rest).valid?).to be false
    end

    it 'should validate genre from enum' do
      expect(Restaurant.new(rest).valid?).to be true

      rest[:genre] = 'invalid'
      expect { Restaurant.new(rest) }.to raise_error(ArgumentError, "'invalid' is not a valid genre")
    end

    it 'should validate delivery_time from enum' do
      expect(Restaurant.new(rest).valid?).to be true

      rest[:delivery_time] = 'invalid'
      expect { Restaurant.new(rest) }.to raise_error(ArgumentError, "'invalid' is not a valid delivery_time")
    end

    it 'should validate rating value' do
      [0, 1, 2, 3].each do |rating|
        rest[:rating] = rating
        expect(Restaurant.new(rest).valid?).to be true
      end

      [-1, 4].each do |rating|
        rest[:rating] = rating
        expect(Restaurant.new(rest).valid?).to be false
      end
    end

    it 'should validate name uniqueness' do
      rest = Restaurant.new(rest)
      rest.save
      rest.dup
      expect(rest.save).to be false
    end
  end
end
