require 'rails_helper'

RSpec.describe ReviewsController, type: :controller do
  let(:rest_hash) do
    {
      name: 'Name',
      genre: :sushi,
      rating: 0,
      accepts_10bis: true,
      delivery_time: 30
    }
  end
  let(:rest) do
    Restaurant.create!(rest_hash)
  end
  let(:review_hash) do
    {
      name: 'Name',
      comment: 'Comment',
      rating: 3
    }
  end
  before (:each) do
    rest.reviews.create(review_hash)
  end

  describe 'actions' do
    it 'should allow creating a review' do
      post :create, params: { restaurant_id: rest.id, review: review_hash }, format: :html
      expect(response.status).to redirect_to(assigns(:restaurant))
      expect(assigns[:restaurant].reviews.length).to eq(2)
    end

    it 'should allow deleting a review' do
      id = rest.reviews[0].id
      delete :destroy, params: { restaurant_id: rest.id, id: id }, format: :html
      expect(response.status).to redirect_to(assigns(:restaurant))
      expect(assigns[:restaurant].reviews.length).to eq(0)
    end
  end
end
