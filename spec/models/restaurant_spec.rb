require 'rails_helper'

RSpec.describe Restaurant, type: :model do
  let(:rest_hash) do
    {
      name: 'Name',
      genre: :sushi,
      rating: 1,
      accepts_10bis: true,
      delivery_time: 30,
    }
  end

  describe 'validations' do
    it 'should require all fields except address' do
      rest_hash.keys.each do |field|
        bad_rest = rest_hash.reject { |k, _v| k == field }
        expect(Restaurant.new(bad_rest).valid?).to be false
      end
    end

    it 'should validate name length' do
      rest_hash[:name] = 'N'
      expect(Restaurant.new(rest_hash).valid?).to be false
    end

    it 'should validate genre from enum' do
      expect(Restaurant.new(rest_hash).valid?).to be true

      rest_hash[:genre] = 'invalid'
      expect do
        Restaurant.new(rest_hash)
      end.to raise_error(ArgumentError, "'invalid' is not a valid genre")
    end

    it 'should validate delivery_time' do
      expect(Restaurant.new(rest_hash).valid?).to be true

      rest_hash[:delivery_time] = 'invalid'
      expect(Restaurant.new(rest_hash).valid?).to be false

      [0, 30, 45, 90, 120].each do |delivery_time|
        rest_hash[:delivery_time] = delivery_time
        expect(Restaurant.new(rest_hash).valid?).to be true
      end

      [-1, 200, 40.5].each do |delivery_time|
        rest_hash[:delivery_time] = delivery_time
        expect(Restaurant.new(rest_hash).valid?).to be false
      end
    end

    it 'should validate rating value' do
      [0, 1, 2, 3].each do |rating|
        rest_hash[:rating] = rating
        expect(Restaurant.new(rest_hash).valid?).to be true
      end

      [-1, 1.4, 4].each do |rating|
        rest_hash[:rating] = rating
        expect(Restaurant.new(rest_hash).valid?).to be false
      end
    end

    it 'should validate name uniqueness' do
      rest_hash = Restaurant.new(rest_hash)
      rest_hash.save
      rest_hash.dup
      expect(rest_hash.save).to be false
    end
  end
end
