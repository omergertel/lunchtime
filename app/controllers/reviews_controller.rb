class ReviewsController < ApplicationController
  def show
    @restaurant = Restaurant.find(params[:restaurant_id])
    redirect_to restaurant_url(@restaurant)
  end

  def new
    @restaurant = Restaurant.find(params[:restaurant_id])
    @review = @restaurant.reviews.build(review_params)
  end

  def create
    @restaurant = Restaurant.find(params[:restaurant_id])
    @review = @restaurant.reviews.create!(review_params)
    redirect_to restaurant_url(@restaurant)
  end

  def destroy
    @restaurant = Restaurant.find(params[:restaurant_id])
    @restaurant.reviews.find(params[:id]).destroy
    redirect_to restaurant_url(@restaurant)
  end

  private

  def review_params
    params.require(:review).permit(:name, :comment, :rating)
  end
end
