class RestaurantsController < ApplicationController
  def create
    restaurant = Restaurant.new(restaurant_params)
    if !restaurant.valid?
      respond_to do |format|
        format.json { render json: restaurant.errors.messages, status: 400 }
      end
    else
      restaurant.save!
    end
  end

  def options
    respond_to do |format|
      opts = {
        genre: Restaurant.genres.keys.to_a,
        delivery_time_min: 0,
        delivery_time_max: 120,
        ratings: [0, 1, 2, 3]
      }
      format.json { render json: opts }
    end
  end

  def index
    respond_to do |format|
      restaurants = Restaurant.where(filter_params)
      format.json { render json: restaurants }
    end
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :rating, :genre,
                                       :accepts_10bis, :delivery_time)
  end

  def filter_params
    params.permit(:genre, :rating, :delivery_time)
  end
end
