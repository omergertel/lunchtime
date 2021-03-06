class RestaurantsController < ApplicationController
  def create
    restaurant = Restaurant.new(restaurant_params)
    unless restaurant.save
      respond_to do |format|
        format.json { render json: restaurant.errors.messages, status: :conflict }
      end
    end
  end

  def options
    respond_to do |format|
      opts = {
        genre: Restaurant.genres.keys.to_a,
        delivery_time_min: 0,
        delivery_time_max: 120,
        ratings: [0, 1, 2, 3],
      }
      format.json { render json: opts }
    end
  end

  def index
    respond_to do |format|
      restaurants = Restaurant.all
      if filter_params[:genre]
        restaurants = restaurants.where(genre: filter_params[:genre])
      end
      if filter_params[:rating]
        restaurants = restaurants.where('rating >= ?', filter_params[:rating])
      end
      if filter_params[:delivery_time]
        restaurants = restaurants.where('delivery_time <= ?', filter_params[:delivery_time])
      end
      format.json { render json: restaurants }
    end
  end

  def show
    respond_to do |format|
      @restaurant = Restaurant.find(params[:id])
      format.json { render json: @restaurant }
      format.html { render 'show' }
    end
  end

  def destroy
    respond_to do |format|
      @restaurant = Restaurant.find(params[:id])
      @restaurant.destroy
      format.json { render json: @restaurant }
      format.html { redirect_to '/' }
    end
  end

  def update
    respond_to do |format|
      restaurant = Restaurant.find(params[:id])
      restaurant.update!(restaurant_params)
      format.json { render json: restaurant }
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
