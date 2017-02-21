require 'rails_helper'

RSpec.describe ReviewsController, type: :controller do
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
  let(:review) do
    create(:review)
  end

  describe 'actions' do
    it '#create' do
      post :create, params: { restaurant_id: rest.id, review: review_hash }, format: :html
      expect(response.status).to redirect_to(assigns(:restaurant))
      expect(assigns[:restaurant].reviews.length).to eq(1)
    end

    it '#destroy' do
      id = review.id
      rest = review.restaurant
      delete :destroy, params: { restaurant_id: rest.id, id: id }, format: :html
      expect(response.status).to redirect_to(assigns(:restaurant))
      expect(assigns[:restaurant].reviews.length).to eq(0)
    end
  end
end
