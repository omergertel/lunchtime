Rails.application.routes.draw do
  root to: 'application#root'
  resources :restaurants, only: [:index, :show, :create, :update, :destroy] do
    get :options, on: :collection
    resources :reviews
  end
end
