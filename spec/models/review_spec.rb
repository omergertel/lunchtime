require 'rails_helper'

RSpec.describe Review, type: :model do
  let(:rest) do
    create(:restaurant)
  end
  let(:review_hash) do
    {
      name: 'Name',
      comment: 'Comment',
      rating: 3,
    }
  end

  describe 'validation' do
    it 'should require fields' do
      [:name, :rating].each do |field|
        bad_review = review_hash.reject { |k, _v| k == field }
        expect(rest.reviews.new(bad_review).valid?).to be false
      end
    end

    it 'should validate rating' do
      [-1, 1.3, 4, nil, 'a'].each do |rating|
        bad_review = review_hash.clone
        bad_review[:rating] = rating
        expect(rest.reviews.new(bad_review).valid?).to be false
      end
    end

    it 'should affect restaurant rating when adding and removing' do
      rest.reviews.create(review_hash)
      rest.reload
      expect(rest.rating).to eq(3)

      new_review = review_hash.clone
      new_review[:rating] = 1
      rest.reviews.create(new_review)
      expect(rest.rating).to eq(2)

      rest.reviews.find_each(&:destroy)
      expect(rest.rating).to eq(0)
    end
  end
end
