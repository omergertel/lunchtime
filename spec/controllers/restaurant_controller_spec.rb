require 'rails_helper'

RSpec.describe RestaurantsController, type: :controller do
  let(:restaurant_hash) do
    {
      name: 'Name',
      genre: :sushi,
      rating: 1,
      accepts_10bis: true,
      delivery_time: 30
    }
  end
  let(:keys) { restaurant_hash.keys.to_a }
  before (:each) do
    Restaurant.create(restaurant_hash)
  end

  describe '#create' do
    it 'should allow creating a restaurant' do
      new_hash = restaurant_hash.clone
      new_hash[:name] = 'New Name'
      post :create, params: { restaurant: new_hash }, format: :json
      expect(response).to be_success

      restaurants = Restaurant.all
      expect(restaurants.length).to eq(2)
      expect(restaurants.map(&:name)).to contain_exactly('Name', 'New Name')
    end

    it 'should fail on missing param' do
      restaurant_hash[:name] = 'New Name'
      restaurant_hash.keys.each do |field|
        bad_rest = restaurant_hash.reject { |k, _v| k == field }
        post :create, params: { restaurant: bad_rest }, format: :json
        expect(response).to_not be_success

        restaurants = Restaurant.all
        expect(restaurants.length).to eq(1)
        expect(restaurants.map(&:name)).to contain_exactly('Name')
      end
    end

    it 'should fail on invalid rating' do
      restaurant_hash[:name] = 'New Name'
      [-1, 300, 1.5, 4].each do |rating|
        restaurant_hash[:rating] = rating
        post :create, params: { restaurant: restaurant_hash }, format: :json
        expect(response).to_not be_success

        restaurants = Restaurant.all
        expect(restaurants.length).to eq(1)
        expect(restaurants.map(&:name)).to contain_exactly('Name')
      end
    end

    it 'should fail on invalid delivery time' do
      restaurant_hash[:name] = 'New Name'
      [-1, 300, 40.5].each do |delivery_time|
        restaurant_hash[:delivery_time] = delivery_time
        post :create, params: { restaurant: restaurant_hash }, format: :json
        expect(response).to_not be_success

        restaurants = Restaurant.all
        expect(restaurants.length).to eq(1)
        expect(restaurants.map(&:name)).to contain_exactly('Name')
      end
    end

    it 'should fail on name if too short' do
      restaurant_hash[:name] = 'N'
      post :create, params: { restaurant: restaurant_hash }, format: :json
      expect(response).to_not be_success

      restaurants = Restaurant.all
      expect(restaurants.length).to eq(1)
      expect(restaurants.map(&:name)).to contain_exactly('Name')
    end

    it 'should fail on name on duplicate name' do
      post :create, params: { restaurant: restaurant_hash }, format: :json
      expect(response).to_not be_success

      restaurants = Restaurant.all
      expect(restaurants.length).to eq(1)
      expect(restaurants.map(&:name)).to contain_exactly('Name')
    end
  end

  describe '#index' do
    it 'should list all restaurants' do
      get :index, format: :json
      restaurants = convert_json_to_symbol_hash(JSON.parse(response.body), keys)
      expect(restaurants).to contain_exactly(restaurant_hash)
    end

    it 'should allow filtering restaurants by genre' do
      get :index, format: :json, params: { genre: :sushi }
      expect(JSON.parse(response.body).length).to eq(1)

      get :index, format: :json, params: { genre: :burgers }
      expect(JSON.parse(response.body).length).to eq(0)
    end

    it 'should allow filtering restaurants by delivery_time' do
      get :index, format: :json, params: { delivery_time: 60 }
      expect(JSON.parse(response.body).length).to eq(1)

      get :index, format: :json, params: { delivery_time: 15 }
      expect(JSON.parse(response.body).length).to eq(0)
    end

    it 'should allow filtering restaurants by rating' do
      get :index, format: :json, params: { rating: 1 }
      expect(JSON.parse(response.body).length).to eq(1)

      get :index, format: :json, params: { rating: 2 }
      expect(JSON.parse(response.body).length).to eq(0)
    end
  end

  describe '#options' do
    it 'should list restaurant creation params' do
      get :options, format: :json
      expect(response.body).to eq({ genre: Restaurant.genres.keys.to_a,
                                    delivery_time_min: 0,
                                    delivery_time_max: 120,
                                    ratings: [0, 1, 2, 3] }.to_json)
    end
  end

  describe '#show' do
    it 'should get a restaurant by id' do
      get :show, format: :json, params: { id: 1 }
      expect(convert_json_to_symbol_hash([JSON.parse(response.body)], keys)).to eq([restaurant_hash])
    end

    it 'should fail for invalid restaurant id' do
      expect { get :show, format: :json, params: { id: -1 } }.to raise_error(ActiveRecord::RecordNotFound)
    end

    it 'should render for html format' do
      get :show, format: :html, params: { id: 1 }
      expect(assigns[:restaurant].name).to eq 'Name'
      expect(response).to render_template(:show)
    end
  end

  describe '#update' do
    it 'should update restuart' do
      put :update, format: :json, params: { id: 1, restaurant: { rating: 2 } }

      updated_hash = restaurant_hash.clone
      updated_hash[:rating] = 2

      get :show, format: :json, params: { id: 1 }
      expect(convert_json_to_symbol_hash([JSON.parse(response.body)], keys)).to eq([updated_hash])
    end
  end

  describe '#destroy' do
    it 'should destroy restuart' do
      get :destroy, format: :json, params: { id: 1 }
      expect { get :show, format: :json, params: { id: 1 } }.to raise_error(ActiveRecord::RecordNotFound)
      expect(Restaurant.all.length).to eq(0)
    end
  end

  private

  def convert_json_to_symbol_hash(restaurants, keys)
    restaurants.map do |rest|
      converted = {}
      rest.each do |k, v|
        k = k.to_sym
        if keys.include? k
          v = v.to_sym if [:genre].include? k
          converted[k] = v
        end
      end
      converted
    end
  end
end
