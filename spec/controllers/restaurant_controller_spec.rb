require 'rails_helper'

RSpec.describe RestaurantsController, type: :controller do
  let(:restaurant_hash) do
    {
      name: 'Name',
      genre: :sushi,
      rating: 1,
      accepts_10bis: true,
      delivery_time: :slow
    }
  end
  let(:keys) { restaurant_hash.keys.to_a }
  before (:each) do
    Restaurant.create(restaurant_hash)
  end

  describe 'validations' do
    it 'should allow creating a restaurant' do
      new_hash = restaurant_hash.clone
      new_hash[:name] = 'New Name'
      post :create, params: { restaurant: new_hash }, format: :json
      expect(response).to be_success

      get :index, format: :json
      restaurants = convert_json_to_symbol_hash(JSON.parse(response.body), keys)
      expect(restaurants).to eq([restaurant_hash, new_hash])
    end

    it 'should list all restaurants' do
      get :index, format: :json
      restaurants = convert_json_to_symbol_hash(JSON.parse(response.body), keys)
      expect(restaurants).to eq([restaurant_hash])
    end

    it 'should allow filtering restaurants' do
      get :index, format: :json, params: { genre: :sushi }
      expect(JSON.parse(response.body).length).to eq(1)

      get :index, format: :json, params: { genre: :burgers }
      expect(JSON.parse(response.body).length).to eq(0)

      get :index, format: :json, params: { delivery_time: :slow }
      expect(JSON.parse(response.body).length).to eq(1)

      get :index, format: :json, params: { delivery_time: :medium }
      expect(JSON.parse(response.body).length).to eq(0)

      get :index, format: :json, params: { rating: 1 }
      expect(JSON.parse(response.body).length).to eq(1)

      get :index, format: :json, params: { rating: 2 }
      expect(JSON.parse(response.body).length).to eq(0)
    end

    it 'should list restaurant creation params' do
      get :options, format: :json
      expect(response.body).to eq({ genre: Restaurant.genres.keys.to_a,
                                    delivery_times: Restaurant.delivery_times.keys.to_a,
                                    ratings: [0, 1, 2, 3] }.to_json)
    end
  end

  private

  def convert_json_to_symbol_hash(restaurants, keys)
    restaurants.map do |rest|
      Hash[rest.map do |k, v|
        k = k.to_sym
        if keys.include? k
          v = v.to_sym if [:genre, :delivery_time].include? k
          [k, v]
        end
      end]
    end
  end
end
